import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import TestRange from '../../components/VideoPlayer/TestRange';

const VideoPlayer = dynamic(() => import('../../components/VideoPlayer/VideoPlayer'), {
  ssr: false,
});

function Watch() {
  const router = useRouter();
  const { id, fileName } = router.query;

  return (
    <div className="bg-black">
      <VideoPlayer />
    </div>
  );
}

export default Watch;
