import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import EpisodesContainer from '../../components/EpisodesContainer/EpisodesContainer';
import Information from '../../components/Information/Information';
import Navbar from '../../components/Navbar/Navbar';
import Recommendations from '../../components/Recommendations/Recommendations';
import SkeletonBanner from '../../components/SkeletonBanner/SkeletonBanner';
import VideoBanner from '../../components/VideoBanner/VideoBanner';
import fetcher from '../../query/fetcher';
import requests from '../../query/requests';
import { getFallBackTitle } from '../../utils/utils';

function DetailPage() {
  const router = useRouter();
  const { type, id } = router.query;

  const url =
    type === 'movie'
      ? `/movie/${id}${requests.movieDetails}`
      : `/tv/${id}${requests.tvDetails}`;

  const { data, error } = useQuery([type, Number(id)], () => fetcher(url), {
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
          <VideoBanner data={data} type={type} />
          <hr className='border-[rgba(0,0,0,0.8)]' />
          <Information data={data} type={type} />
          {type == 'tv' && <EpisodesContainer id={id} seasons={data.seasons} />}
          <Recommendations type={type} data={data.recommendations} />
        </>
      )}
    </>
  );
}

export default DetailPage;
