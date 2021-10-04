import { useRouter } from 'next/router';
import { BiPlus } from 'react-icons/bi';
import { dateToYearOnly, getFallBackTitle, truncate } from '../../utils/utils';
import Button from '../Button/Button';
import config from '../../config';

const { FALLBACK_URL, BACKDROP_URL } = config;

function RecomPoster({ data }) {
  const { id, backdrop_path, overview, release_date, first_air_date, vote_average } = data;

  const fallBackTitle = getFallBackTitle(data);

  const reducedDate = release_date
    ? dateToYearOnly(release_date)
    : first_air_date
    ? dateToYearOnly(first_air_date)
    : 'Not Available';

  const description = truncate(overview, 50);

  const router = useRouter();
  const { type } = router.query;

  const handleRedirect = () => {
    router.push({
      pathname: '/[type]/[id]',
      query: {
        type,
        id,
      },
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleRedirect}
      className="transition-transform duration-200 md:hover:z-10 transform md:hover:scale-110 min-h-[22em] m-[.1em] h-full cursor-pointer relative overflow-hidden rounded-[.25em]"
    >
      <div className="imageWrapper h-[17vh] w-full relative overflow-hidden">
        {backdrop_path ? (
          <img loading="lazy" src={`${BACKDROP_URL}${backdrop_path}`} alt={fallBackTitle} />
        ) : (
          <img loading="lazy" src={FALLBACK_URL} alt={fallBackTitle} layout="fill" />
        )}
      </div>
      <div className="metadataWrap min-h-full bg-[#2f2f2f] p-[16px]">
        <div className="metadata flex justify-between items-center">
          <h1 className="font-semibold text-lg">{fallBackTitle}</h1>
          <Button type="circular">
            <BiPlus />
          </Button>
        </div>
        <div className="infoContainer flex space-x-2">
          <div className="score font-extrabold text-[#46d369]">
            {Math.floor(Number(vote_average) * 10)}%
          </div>
          <div className="year">{reducedDate}</div>
        </div>
        <div className="overview mt-2">{description}</div>
      </div>
      <style jsx>
        {`
          .imageWrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
    </div>
  );
}

export default RecomPoster;
