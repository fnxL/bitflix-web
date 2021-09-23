/* eslint-disable react/self-closing-comp */
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import VTTConverter from 'srt-webvtt';
import { Spinner } from '../../components';
import useVideoPlayerStore from '../../store/videoPlayerStore';

const VideoPlayer = dynamic(() => import('../../components/VideoPlayer/VideoPlayer'), {
  ssr: false,
});

function Watch() {
  const router = useRouter();
  const { id, fileName, title, imdb, season_number, episode_number } = router.query;
  useVideoPlayerStore.setState({ title });
  const sourceLoaded = useVideoPlayerStore((state) => state.sourceLoaded);
  const srtURL = useVideoPlayerStore((state) => state.srtURL);

  const { data, error } = useQuery(
    ['streamlinks', id],
    async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/media/streamlinks?fileName=${encodeURI(fileName)}`
      );
      return data;
    },
    { enabled: !!fileName }
  );

  let sources;
  let obj;
  if (data) {
    sources = [
      { id: 0, quality: '2160p', url: data?.['2160'][0]?.link, selected: false },
      { id: 1, quality: '1080p', url: data?.['1080'][0]?.link, selected: true },
      { id: 2, quality: '720p', url: data?.['720'][0]?.link, selected: false },
    ];

    obj = btoa(
      JSON.stringify({
        sublanguageid: 'eng',
        filename: data?.['1080'][0]?.name,
        filesize: data?.['1080'][0]?.size,
        season: season_number,
        episode: episode_number,
        extensions: ['srt', 'vtt'],
        imdbid: imdb,
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

  if (sources) useVideoPlayerStore.setState({ sourceList: sources, currentSource: sources[1].url });
  if (subst) {
    useVideoPlayerStore.setState({ srtURL: `${subst?.subs?.en?.url}` });
  }

  // Convert SRT subs to VTT on the Fly!
  useEffect(() => {
    const createFileObject = async () => {
      const response = await fetch(srtURL);
      const blob = await response.blob();
      const newBlob = new Blob([blob], { type: 'text/vtt' });
      return newBlob;
    };
    const srtToVtt = async () => {
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
        <VideoPlayer />
      </div>
    </>
  );
}

export default Watch;
