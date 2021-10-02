import Head from 'next/head';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';
import { AuthGuard, Row, VideoBanner } from '../components';
import Layout from '../components/Layout';
import { HomePageRows } from '../config/rowConfig';
import useViewport from '../hooks/useViewport';
import fetcher from '../query/fetcher';
import requests from '../query/requests';
import useStore from '../store/store';
import useVideoPlayerStore from '../store/videoPlayerStore';
import { randomize } from '../utils/utils';

const url = requests.popularHotstarMovies;

function Home() {
  const homeRowData = useStore((state) => state.homeRowData);
  const homeHasMore = useStore((state) => state.homeHasMore);
  const homeHandleNext = useStore((state) => state.homeHandleNext);
  const featured = useStore((state) => state.homeFeatured);
  const setFeatured = useStore((state) => state.setHomeFeatured);
  const [isMount, setIsMount] = useState(false);
  const { width } = useViewport();
  useVideoPlayerStore.getState().resetVideoPlayer();
  const { data } = useQuery(['Popular on Hotstar', url], () => fetcher(url), {
    enabled: isMount,
  });

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
      <div className="overflow-hidden">
        <VideoBanner id={featured?.id} type="movie">
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

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default AuthGuard(Home);
