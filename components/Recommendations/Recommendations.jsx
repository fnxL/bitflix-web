import RecomPoster from './RecomPoster';

function Recommendations({ data, type }) {
  const { results } = data;

  if (!results.length)
    return (
      <h1 className='px-[3vw] mt-10 font-bold text-2xl mb-20'>
        No recommendations for this title
      </h1>
    );

  return (
    <div className='recommendations px-[4%] mt-10 mb-40'>
      <h3 className='font-bold text-2xl mt-20'>More Like this</h3>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5'>
        {results.map((item) => (
          <RecomPoster type={type} key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
