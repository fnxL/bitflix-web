/* eslint-disable react/self-closing-comp */
import axios from 'axios';
import { decode, encode } from 'js-base64';
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

  const { id, metadata } = router.query;

  const { fileName, title, imdb_id, season_number, episode_number } = JSON.parse(decode(metadata));

  useVideoPlayerStore.setState({ title });

  const sourceLoaded = useVideoPlayerStore((state) => state.sourceLoaded);
  const srtURL = useVideoPlayerStore((state) => state.srtURL);
  const quality = useVideoPlayerStore((state) => state.quality);

  const { data } = useQuery(
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

  if (sources) useVideoPlayerStore.setState({ sourceList: sources, currentSource: sources[1] });

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
