import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import {
  EpisodesContainer,
  Information,
  Navbar,
  Recommendations,
  SkeletonBanner,
  VideoBanner,
} from '../../components';
import fetcher from '../../query/fetcher';
import requests from '../../query/requests';
import useVideoPlayerStore from '../../store/videoPlayerStore';
import { getFallBackTitle } from '../../utils/utils';

function DetailPage() {
  const router = useRouter();
  const { type, id } = router.query;
  useVideoPlayerStore.getState().resetVideoPlayer();

  const url =
    type === 'movie' ? `/movie/${id}${requests.movieDetails}` : `/tv/${id}${requests.tvDetails}`;

  const { data } = useQuery([type, Number(id)], () => fetcher(url), {
    enabled: !!id,
  });

  const fallBackTitle = getFallBackTitle(data);

  return (
    <>
      <Head>
        <title>{fallBackTitle}</title>
      </Head>
      <Navbar />
      {!data && (
        <>
          <SkeletonBanner />
        </>
      )}
      {data && (
        <>
          <VideoBanner data={data} type={type} imdb={data.external_ids.imdb_id} />
          <hr className="border-[rgba(0,0,0,0.8)]" />
          <Information data={data} type={type} />
          {type === 'tv' && (
            <EpisodesContainer
              id={id}
              seasons={data.seasons}
              title={fallBackTitle}
              imdb={data.external_ids.imdb_id}
            />
          )}
          <Recommendations type={type} data={data.recommendations} />
        </>
      )}
    </>
  );
}

export default DetailPage;