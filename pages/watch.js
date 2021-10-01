/* eslint-disable react/self-closing-comp */
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AuthGuard, Spinner } from '../components';
import useWatchTitle from '../hooks/useWatchTitle';

const VideoPlayer = dynamic(() => import('../components/VideoPlayer/VideoPlayer'), {
  ssr: false,
});

function Watch() {
  const router = useRouter();

  const { id, metadata } = router.query;

  const { data, title, sourceLoaded, onError } = useWatchTitle(id, metadata);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="bg-black">
        {(!data || !sourceLoaded) && <Spinner />}
        <VideoPlayer onError={onError} />
      </div>
    </>
  );
}

export default AuthGuard(Watch);
