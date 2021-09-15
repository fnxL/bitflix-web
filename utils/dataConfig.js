import requests from '../query/requests';

export const genresList = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
  {
    id: 10759,
    name: 'Action & Adventure',
  },
  {
    id: 10762,
    name: 'Kids',
  },
  {
    id: 10763,
    name: 'News',
  },
  {
    id: 10764,
    name: 'Reality',
  },
  {
    id: 10765,
    name: 'Sci-Fi & Fantasy',
  },
  {
    id: 10766,
    name: 'Soap',
  },
  {
    id: 10767,
    name: 'Talk',
  },
  {
    id: 10768,
    name: 'War & Politics',
  },
];

export const HomePageRows = [
  {
    id: 3,
    title: 'Popular on Netflix',
    url: requests.popularNetflixMovies,
    type: 'movie',
  },
  {
    id: 0,
    title: 'Popular on Prime',
    url: requests.popularPrimeMovies,
    type: 'movie',
  },

  {
    id: 1,
    title: 'Popular on Hotstar',
    url: requests.popularHotstarMovies,
    type: 'movie',
  },

  {
    id: 7,
    title: 'Netflix Originals',
    url: requests.netflixOriginals,
    isLarge: true,
    type: 'tv',
  },
  {
    id: 4,
    title: 'Popular TV Shows',
    url: requests.popularTVShows,
    isLarge: true,
    type: 'tv',
  },
  {
    id: 8,
    title: 'Amazon Originals',
    url: requests.amazonOriginals,
    isLarge: true,
    type: 'tv',
  },
  {
    id: 5,
    title: 'Hindi Movies',
    url: requests.hindiMovies,
    type: 'movie',
  },
  {
    id: 6,
    title: 'Hindi Series',
    url: requests.hindiSeries,
    isLarge: true,
    type: 'tv',
  },
];
