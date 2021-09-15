import VideoBanner from '../components/VideoBanner/VideoBanner';
import Navbar from '../components/Navbar/Navbar';
import Row from '../components/Row/Row';
import { HomePageRows } from '../utils/dataConfig';

function Home() {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <VideoBanner type='movie' />
      <Row {...HomePageRows[0]} />
    </div>
  );
}

export default Home;
