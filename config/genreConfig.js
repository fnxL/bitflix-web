import requests from '../query/requests';

export const genreConfig = [
  {
    id: 0,
    title: 'Popular Movies',
    url: requests.popularMovies,
    genre: 'popular',
    type: 'movie',
  },
  {
    id: 1,
    title: 'Trending Now',
    url: requests.trendingAll,
    genre: 'trending',
    type: 'all',
  },
  {
    id: 2,
    title: 'Popular TV Shows',
    url: requests.popularTVShows,
    genre: 'popular',
    isLarge: true,
    type: 'tv',
  },
  {
    id: 3,
    title: 'Popular on Prime',
    url: requests.popularPrimeMovies,
    genre: 'prime',
    type: 'movie',
  },
  {
    id: 6,
    title: 'Horror',
    url: requests.horrorMovies,
    type: 'movie',
    genre: 'horror',
  },
  {
    id: 7,
    title: 'Sci-Fi',
    url: requests.scifiMovies,
    type: 'movie',
    genre: 'sci-fi',
  },
  {
    id: 8,
    title: 'Crime',
    url: requests.crimeMovies,
    type: 'movie',
    genre: 'crime',
  },
  {
    id: 4,
    title: 'Hindi Movies',
    url: requests.hindiMovies,
    type: 'movie',
    genre: 'hindi',
  },
  {
    id: 5,
    title: 'Hindi Series',
    url: requests.hindiSeries,
    type: 'tv',
    genre: 'hindi',
  },
];
