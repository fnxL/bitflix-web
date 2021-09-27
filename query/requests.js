import { watchProviders } from '../utils/utils';
import config from '../config';

const { TMDB, ENG, WATCH_REGION } = config;

const { netflix, primeVideo, disneyPlus, hotstar } = watchProviders;

const requests = {
  searchAll: `/search/multi?api_key=${TMDB}&query=`,
  trendingAll: `/trending/all/day?api_key=${TMDB}`,
  movieDetails: `?api_key=${TMDB}&language=en-US&append_to_response=videos,releases,recommendations,credits,external_ids`,
  tvDetails: `?api_key=${TMDB}&language=en-US&append_to_response=videos,content_ratings,recommendations,credits,external_ids`,
  apiKey: `?api_key=${TMDB}&language=en-US`,
  // Movies
  // watchProviders
  popularNetflixMovies: `/discover/movie?api_key=${TMDB}&sort_by=popularity.desc&include_adult=true&with_watch_providers=${netflix}&watch_region=${WATCH_REGION}&with_watch_monetization_types=flatrate|free|ads|rent|buy`,
  popularPrimeMovies: `/discover/movie?api_key=${TMDB}&sort_by=popularity.desc&include_adult=true&with_watch_providers=${primeVideo}|9&watch_region=${WATCH_REGION}&with_watch_monetization_types=flatrate|free|ads|rent|buy`,
  popularHotstarMovies: `/discover/movie?api_key=${TMDB}&sort_by=popularity.desc&include_adult=true&with_watch_providers=${hotstar}&watch_region=IN&with_watch_monetization_types=flatrate|free|ads|rent|buy`,
  popularDisneyPlus: `/discover/movie?api_key=${TMDB}&sort_by=popularity.desc&include_adult=true&with_watch_providers=${disneyPlus}&watch_region=${WATCH_REGION}&with_watch_monetization_types=flatrate|free|ads|rent|buy`,
  // movie genres
  horrorMovies: `/discover/movie?api_key=${TMDB}&sort_by=popularity.desc&include_adult=tru&with_genres=27&watch_region=US&with_watch_monetization_types=flatrate|free|ads|rent|buy`,
  scifiMovies: `/discover/movie?api_key=${TMDB}&sort_by=popularity.desc&include_adult=tru&with_genres=878&watch_region=US&with_watch_monetization_types=flatrate|free|ads|rent|buy`,
  crimeMovies: `/discover/movie?api_key=${TMDB}&sort_by=popularity.desc&include_adult=tru&with_genres=80&watch_region=US&with_watch_monetization_types=flatrate|free|ads|rent|buy`,

  // Popular Movies
  popularMovies: `/discover/movie?api_key=${TMDB}&sort_by=popularity.desc&include_adult=true&watch_region=${WATCH_REGION}&with_watch_monetization_types=flatrate|free|ads|rent|buy`,
  hindiMovies: `/discover/movie?api_key=${TMDB}&sort_by=popularity.desc&include_adult=true&include_video=false&with_original_language=hi&watch_region=IN&with_watch_monetization_types=flatrate|free|ads|rent|buy`,

  // TV Shows
  popularTVShows: `/discover/tv?api_key=${TMDB}&sort_by=popularity.desc&include_null_first_air_dates=false&watch_region=${WATCH_REGION}`,
  popularPrimeShows: `/discover/tv?api_key=${TMDB}&sort_by=popularity.desc&include_adult=true&with_watch_providers=${primeVideo}|9&watch_region=${WATCH_REGION}`,
  popularNetflixShows: `/discover/tv?api_key=${TMDB}&sort_by=popularity.desc&include_adult=true&with_watch_providers=${netflix}&watch_region=${WATCH_REGION}`,
  popularHotstarShows: `/discover/tv?api_key=${TMDB}&sort_by=popularity.desc&include_adult=true&with_watch_providers=${hotstar}&watch_region=${WATCH_REGION}`,
  hindiSeries: `/discover/tv?api_key=${TMDB}&sort_by=popularity.desc&with_networks=1024|213&include_null_first_air_dates=false&with_original_language=hi&watch_region=IN&with_watch_monetization_types=flatrate`,

  actionAdventureShows: `/discover/tv?api_key=${TMDB}&sort_by=popularity.desc&include_null_first_air_dates=false&watch_region=${WATCH_REGION}&with_genres=10759`,
  scifiShows: `/discover/tv?api_key=${TMDB}&sort_by=popularity.desc&include_null_first_air_dates=false&watch_region=${WATCH_REGION}&with_genres=10765`,

  // waste
  fetchActionMovies: `/discover/movie?api_key=${TMDB}&with_genres=28&sort_by=popularity.desc&language=${ENG}`,
  fetchAdventureMovies: `/discover/movie?api_key=${TMDB}&with_genres=12&sort_by=popularity.desc&language=${ENG}`,
  fetchComedyMovies: `/discover/movie?api_key=${TMDB}&with_genres=35&sort_by=popularity.desc&language=${ENG}`,
  fetchHorrorMovies: `/discover/movie?api_key=${TMDB}&with_genres=27&sort_by=popularity.desc&language=${ENG}`,
  fetchRomanceMovies: `/discover/movie?api_key=${TMDB}&with_genres=10749&sort_by=popularity.desc&language=${ENG}`,
  fetchWarMovies: `/discover/movie?api_key=${TMDB}&with_genres=10752&sort_by=popularity.desc&language=${ENG}`,
  fetchAnimationMovies: `/discover/movie?api_key=${TMDB}&with_genres=16&sort_by=popularity.desc&language=${ENG}`,
  discoverMovies: `/discover/movie?api_key=${TMDB}&sort_by=popularity.desc&language=${ENG}`,
  // Series
  discoverSeries: `/discover/tv?api_key=${TMDB}&sort_by=popularity.desc&language=${ENG}`,
  fetchTrendingSeries: `/trending/tv/week?api_key=${TMDB}&sort_by=popularity.desc&language=${ENG}`,
  fetchActionAdventureSeries: `/discover/tv?api_key=${TMDB}&with_genres=10759&sort_by=popularity.desc&language=${ENG}`,
  fetchAnimationSeries: `/discover/tv?api_key=${TMDB}&with_genres=16&sort_by=popularity.desc&language=${ENG}`,
  fetchComedySeries: `/discover/tv?api_key=${TMDB}&with_genres=35&sort_by=popularity.desc&language=${ENG}`,
  fetchCrimeSeries: `/discover/tv?api_key=${TMDB}&with_genres=80&sort_by=popularity.desc&language=${ENG}`,
  fetchDocumentarySeries: `/discover/tv?api_key=${TMDB}&with_genres=99&sort_by=popularity.desc&language=${ENG}`,
  fetchFamilySeries: `/discover/tv?api_key=${TMDB}&with_genres=10751&sort_by=popularity.desc&language=${ENG}`,
  fetchKidsSeries: `/discover/tv?api_key=${TMDB}&with_genres=10762&sort_by=popularity.desc&language=${ENG}`,
  fetchSciFiFantasySeries: `/discover/tv?api_key=${TMDB}&with_genres=10765&sort_by=popularity.desc&language=${ENG}`,
};

export default requests;
