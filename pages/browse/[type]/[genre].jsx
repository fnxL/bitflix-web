import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Navbar } from '../../../components';
import Poster from '../../../components/Poster/Poster';
import { genreConfig } from '../../../config/genreConfig';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import axios from '../../../query/tmdbAxiosInstance';

function Genre() {
  const router = useRouter();
  const { genre, type } = router.query;

  const loadMoreRef = useRef();

  const genreObject = genreConfig.find((item) => item.genre === genre && item.type === type);

  const fetchPaginatedData = ({ pageParam = 1 }) =>
    axios.get(`${genreObject.url}&page=${pageParam}`).then((res) => res.data);

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery(genre, fetchPaginatedData, {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    });

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <Navbar />
      <div className="category py-[2em] px-[4vw] mt-[7em]">
        <h2 className="mb-4 leading-[1.25vw] text-left inline-block font-bold md:text-[22px] xl:text-[1.4vw]">
          {genreObject.title}
        </h2>
        <div className="category_container my-0 mx-auto mt-[3vh] w-full">
          {data.pages.map((group, i) => (
            <div className="contents" key={i}>
              {group.results.map((result) => (
                <Poster key={result.id} result={result} type={type} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-20 pl-[10%]">
        <button
          ref={loadMoreRef}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>

      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
}

export default Genre;
