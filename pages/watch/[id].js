import { useRouter } from 'next/router';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

function Watch() {
  const router = useRouter();
  const { id, fileName } = router.query;

  return (
    <div>
      <VideoPlayer />
    </div>
  );
}

export default Watch;
