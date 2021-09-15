import VideoBanner from '../components/VideoBanner/VideoBanner';
import Navbar from '../components/Navbar/Navbar';
import Row from '../components/Row/Row';
import { HomePageRows } from '../utils/dataConfig';

function Home() {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <div className='mainview relative min-h-[1000px] z-0'>
        <VideoBanner type='movie' />
        <Row {...HomePageRows[0]} />
      </div>
    </div>
  );
}

export default Home;
