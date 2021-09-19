import requests from '../query/requests';

export const HomePageRows = [
  {
    id: 0,
    title: 'Popular on Netflix',
    url: requests.popularNetflixMovies,
    type: 'movie',
  },
  {
    id: 8,
    title: 'Trending Now',
    url: requests.trendingAll,
    type: 'all',
  },

  {
    id: 4,
    title: 'Popular TV Shows',
    url: requests.popularTVShows,
    isLarge: true,
    type: 'tv',
  },
  {
    id: 1,
    title: 'Popular on Prime',
    url: requests.popularPrimeMovies,
    type: 'movie',
  },

  {
    id: 3,
    title: 'Netflix Originals',
    url: requests.netflixOriginals,
    isLarge: true,
    type: 'tv',
  },
  {
    id: 10,
    title: 'Popular on Hotstar',
    url: requests.popularHotstarMovies,
    type: 'movie',
  },
  {
    id: 2,
    title: 'Popular on DisneyPlus',
    url: requests.popularDisneyPlus,
    type: 'movie',
    isLarge: true,
  },

  {
    id: 6,
    title: 'Hindi Movies',
    url: requests.hindiMovies,
    type: 'movie',
  },

  {
    id: 5,
    title: 'Amazon Originals',
    url: requests.amazonOriginals,
    isLarge: true,
    type: 'tv',
  },

  {
    id: 7,
    title: 'Hindi Series',
    url: requests.hindiSeries,
    type: 'tv',
  },
];
