import axios from 'axios';
import { decode, encode } from 'js-base64';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import config from '../config';
import useVideoPlayerStore from '../store/videoPlayerStore';
import { getSearchTerm } from '../utils/utils';

const { SERVER_URL } = config;

let VTTConverter = '';

const useWatchTitle = (id, metadata) => {
  const { title, imdb_id, episode_name, type, season_number, episode_number } = JSON.parse(
    decode(metadata || 'e30=')
  );

  const showDisplayName =
    type === 'tv' && getSearchTerm(title, type, { episode_number, season_number });

  const sourceLoaded = useVideoPlayerStore((state) => state.sourceLoaded);
  const srtURL = useVideoPlayerStore((state) => state.srtURL);
  const quality = useVideoPlayerStore((state) => state.quality);
  const currentSource = useVideoPlayerStore((state) => state.currentSource);

  const { data } = useQuery(
    ['streamlinks', id],
    async () => {
      const { data } = await axios.get(`${SERVER_URL}/media/streamlinks?metadata=${metadata}`);
      return data;
    },
    { enabled: !!title }
  );

  let sources;

  if (data && !currentSource) {
    if (data?.['2160']?.length === 0 && data?.['1080']?.length === 0 && data?.['720']?.length === 0)
      useVideoPlayerStore.setState({ error: 'No sources found!' });

    sources = [data?.['2160'][0], data?.['1080'][0], data?.['720'][0]].map((item) => ({
      ...item,
      selected: item?.quality === `${quality}p`,
    }));
  }

  // fetch subtitles for each source change;
  useEffect(() => {
    const error = useVideoPlayerStore.getState().error;

    if (error)
      useVideoPlayerStore.setState({
        error: '',
      });

    const getSubtitles = async (obj) => {
      const { data } = await axios.get(`${SERVER_URL}/media/subtitles?metadata=${obj}`);
      return data;
    };

    const obj = encode(
      JSON.stringify({
        sublanguageid: 'eng',
        filename: currentSource?.name,
        filesize: currentSource?.size,
        season: season_number,
        episode: episode_number,
        extensions: ['srt', 'vtt'],
        imdbid: imdb_id,
      })
    );

    if (currentSource) {
      getSubtitles(obj)
        .then((data) =>
          useVideoPlayerStore.setState({
            srtURL: `${data?.en?.url}`,
            subName: `${data?.en?.filename}`,
          })
        )
        .catch(() =>
          useVideoPlayerStore.setState({
            error: 'Invalid source, please change the source',
          })
        );
    }
  }, [currentSource, episode_number, imdb_id, season_number]);

  const onError = () => {
    useVideoPlayerStore.setState({ playing: false });
    const sourceLix = useVideoPlayerStore.getState().selectedSourceList;
    const { tryCount } = useVideoPlayerStore.getState();

    if (tryCount < sourceLix.length) {
      useVideoPlayerStore.setState({
        currentSource: sourceLix[tryCount],
      });
      useVideoPlayerStore.setState({
        tryCount: tryCount + 1,
      });
    } else {
      useVideoPlayerStore.setState({
        error: 'No source is playable right now!',
      });
    }
  };

  // Convert SRT subs to VTT on the Fly!
  useEffect(() => {
    const createFileObject = async () => {
      const response = await fetch(srtURL);
      const blob = await response.blob();
      const newBlob = new Blob([blob], { type: 'text/vtt' });
      return newBlob;
    };

    const srtToVtt = async () => {
      const imp = await import('srt-webvtt');
      VTTConverter = imp.default;
      const vttConverter = new VTTConverter(await createFileObject());
      const url = await vttConverter.getURL();
      return url;
    };

    if (srtURL) srtToVtt().then((url) => useVideoPlayerStore.setState({ vttURL: url }));
  }, [srtURL]);

  useEffect(() => {
    useVideoPlayerStore.setState({
      title: `${type === 'movie' ? title : `${showDisplayName}: ${episode_name}`}`,
    });
  }, [episode_name, showDisplayName, title, type]);

  useEffect(() => {
    useVideoPlayerStore.setState({
      sourceList: sources ? sources : [],
      currentSource: sources && sources[1],
      selectedSourceList: data ? data?.[quality] : [],
    });
  }, [data]);

  return { title, data, onError, sourceLoaded };
};

export default useWatchTitle;
