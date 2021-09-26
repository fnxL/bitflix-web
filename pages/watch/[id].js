/* eslint-disable react/self-closing-comp */
import axios from 'axios';
import { decode, encode } from 'js-base64';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Spinner } from '../../components';
import useVideoPlayerStore from '../../store/videoPlayerStore';
import { getSearchTerm } from '../../utils/utils';

let VTTConverter = '';

const VideoPlayer = dynamic(() => import('../../components/VideoPlayer/VideoPlayer'), {
  ssr: false,
});

function Watch() {
  const router = useRouter();

  const { id, metadata } = router.query;
  const { title, imdb_id, episode_name, type, season_number, episode_number } = JSON.parse(
    decode(metadata || 'e30=')
  );

  const showDisplayName =
    type === 'tv' && getSearchTerm(title, type, { episode_number, season_number });

  useVideoPlayerStore.setState({
    title: `${type === 'movie' ? title : `${showDisplayName}: ${episode_name}`}`,
  });

  const sourceLoaded = useVideoPlayerStore((state) => state.sourceLoaded);
  const srtURL = useVideoPlayerStore((state) => state.srtURL);
  const quality = useVideoPlayerStore((state) => state.quality);

  const { data } = useQuery(
    ['streamlinks', id],
    async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/media/streamlinks?metadata=${metadata}`
      );
      return data;
    },
    { enabled: !!title }
  );

  let sources;
  let obj;

  if (data) {
    if (data?.['2160']?.length === 0 && data?.['1080']?.length === 0 && data?.['720']?.length === 0)
      useVideoPlayerStore.setState({ error: 'No sources found!' });

    sources = [data?.['2160'][0], data?.['1080'][0], data?.['720'][0]].map((item) => ({
      ...item,
      selected: item?.quality === `${quality}p`,
    }));

    obj = encode(
      JSON.stringify({
        sublanguageid: 'eng',
        filename: data?.[quality][0]?.name,
        filesize: data?.[quality][0]?.size,
        season: season_number,
        episode: episode_number,
        extensions: ['srt', 'vtt'],
        imdbid: imdb_id,
      })
    );
  }

  const { data: subst } = useQuery(
    ['subtitles', id],
    async () => {
      const { data } = await axios.get(`http://localhost:5000/api/media/subtitles?metadata=${obj}`);
      return data;
    },
    { enabled: !!data }
  );

  if (sources)
    useVideoPlayerStore.setState({
      sourceList: sources,
      currentSource: sources[1],
      selectedSourceList: data?.[quality],
    });

  if (subst) {
    useVideoPlayerStore.setState({
      srtURL: `${subst?.en?.url}`,
      subName: `${subst?.en?.filename}`,
    });
  }

  const onError = () => {
    const sourceLix = useVideoPlayerStore.getState().selectedSourceList;
    const tryCount = useVideoPlayerStore.getState().tryCount;

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

  return (
    <>
      <Head></Head>

      <div className="bg-black">
        {(!data || !sourceLoaded) && <Spinner />}
        <VideoPlayer onError={onError} />
      </div>
    </>
  );
}

export default Watch;
