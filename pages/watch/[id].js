import { useRouter } from 'next/router';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

function Watch() {
  const router = useRouter();
  const { id, fileName } = router.query;

  return (
    <div>
      {JSON.stringify({ id, fileName }, null, 4)}
      <VideoPlayer />
    </div>
  );
}

export default Watch;
