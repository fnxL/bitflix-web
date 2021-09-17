import VideoBanner from '../components/VideoBanner/VideoBanner';
import Navbar from '../components/Navbar/Navbar';
import { HomePageRows } from '../utils/rowConfig';
import useStore from '../store/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import Row from '../components/Row/Row';
import requests from '../query/requests';
import fetcher from '../query/fetcher';
import { randomize } from '../utils/utils';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import useViewport from '../hooks/useViewport';
import Head from 'next/head';

const url = requests.popularHotstarMovies;

function Home() {
  const homeRowData = useStore((state) => state.homeRowData);
  const homeHasMore = useStore((state) => state.homeHasMore);
  const homeHandleNext = useStore((state) => state.homeHandleNext);
  const featured = useStore((state) => state.homeFeatured);
  const setFeatured = useStore((state) => state.setHomeFeatured);
  const [isMount, setIsMount] = useState(false);
  const { width } = useViewport();

  const { data, error } = useQuery(
    ['Popular on Hotstar', url],
    () => fetcher(url),
    { enabled: isMount }
  );

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    if (data) {
      if (!featured) {
        setFeatured(data.results[randomize(data.results)]);
      }
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Bitflix</title>
      </Head>
      <div className='overflow-hidden'>
        <Navbar />
        <VideoBanner data={featured} type='movie'>
          {width > 1024 && <Row {...HomePageRows[0]} />}
        </VideoBanner>

        {width <= 1024 && <Row {...HomePageRows[0]} />}
        <Row {...HomePageRows[1]} />
        <InfiniteScroll
          dataLength={homeRowData.length}
          next={() => homeHandleNext(HomePageRows.slice(2))}
          hasMore={homeHasMore}
          style={{ overflow: 'hidden' }}
        >
          {homeRowData}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default Home;
