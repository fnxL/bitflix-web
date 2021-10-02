import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { AuthGuard, Poster } from '../components';
import Layout from '../components/Layout';
import fetcher from '../query/fetcher';
import requests from '../query/requests';

function Search() {
  const router = useRouter();

  const { q } = router.query;

  const { data } = useQuery(q, () => fetcher(`${requests.searchAll}${q}`));

  const results = data?.results;

  return (
    <>
      <div className="Search">
        {results && results.length > 0 && <h2 className="title">Search results for: {q}</h2>}
        <div className="search_container">
          {results && results.length > 0 ? (
            results.map((result) => (
              <Poster key={result.id} result={result} type={result.media_type} />
            ))
          ) : (
            <h2 className="title">No results found.</h2>
          )}
        </div>
      </div>
      <style jsx>{`
        .search {
          padding: 2em 4vw 0 4vw;
          margin-top: 7em;
        }

        .search_container {
          margin: 0 auto;
          width: 100%;
          padding: 4%;
        }

        .title {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          text-align: left;
          padding-left: 4%;
          padding-top: 5%;
        }
        @media screen and (min-width: 768px) {
          .title {
            font-size: 18px;
          }
        }
        @media screen and (min-width: 1330px) {
          .title {
            font-size: 1.2vw;
          }
        }
      `}</style>
    </>
  );
}

Search.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AuthGuard(Search);
