import genreList from '../utils/genreList';

const useGenreConversion = (genreIds) => {
  const genresConvertedList = [];
  genreIds
    .slice(0, 3)
    .map((genreId) =>
      genreList.filter((el) => el.id === genreId).map((el) => genresConvertedList.push(el.name))
    );

  return genresConvertedList;
};

export default useGenreConversion;
