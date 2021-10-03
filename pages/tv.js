import Head from 'next/head';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';
import { AuthGuard, Row, VideoBanner } from '../components';
import Layout from '../components/Layout';
import { tvPageRows } from '../config/rowConfig';
import useViewport from '../hooks/useViewport';
import fetcher from '../query/fetcher';
import requests from '../query/requests';
import useStore from '../store/store';
import useVideoPlayerStore from '../store/videoPlayerStore';
import { randomize } from '../utils/utils';

const url = requests.popularTVShows;

function Tv() {
  const { width } = useViewport();
  const tvRowData = useStore((state) => state.tvRowData);
  const tvHasMore = useStore((state) => state.tvHasMore);
  const tvHandleNext = useStore((state) => state.tvHandleNext);
  const featured = useStore((state) => state.tvFeatured);
  const setFeatured = useStore((state) => state.setTvFeatured);
  const [isMount, setIsMount] = useState(false);
  useVideoPlayerStore.getState().resetVideoPlayer();

  const { data } = useQuery(['Popular TV Shows', url], () => fetcher(url), {
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
        <title>TV Shows</title>
      </Head>
      <div className="overflow-hidden">
        <VideoBanner id={featured?.id} type="tv">
          {width > 1024 && <Row {...tvPageRows[0]} />}
        </VideoBanner>

        {width <= 1024 && <Row {...tvPageRows[0]} />}
        <Row {...tvPageRows[1]} />
        <InfiniteScroll
          dataLength={tvRowData.length}
          next={() => tvHandleNext(tvPageRows.slice(2))}
          hasMore={tvHasMore}
          style={{ overflow: 'hidden' }}
        >
          {tvRowData}
        </InfiniteScroll>
      </div>
    </>
  );
}

Tv.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AuthGuard(Tv);
