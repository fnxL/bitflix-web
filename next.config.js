/* eslint-disable object-shorthand */
module.exports = {
  reactStrictMode: true,
  env: {
    TMDB: 'e47e6864261ea10181fc486b7cf6aba5',
    FANART: '3a565b507ab4255eb92cb933687f1064',
    ENG: 'en-US',
    HINDI: 'hi',
    WATCH_REGION: 'IN',
    FEATURED_URL: 'https://image.tmdb.org/t/p/w1280',
    BACKDROP_URL: 'https://image.tmdb.org/t/p/w300',
    POSTER_URL: 'https://image.tmdb.org/t/p/w342',
    FALLBACK_URL: 'https://i.stack.imgur.com/y9DpT.jpg',
    // PROXY_URL: 'https://bitflix.pages.dev/v1', // cloudflare end url
  },
  // async rewrites() {
  //   console.log('rewrites');
  //   return [
  //     {
  //       source: '/v1/:path*',
  //       destination: 'SERVER_URL/api/:path*', // server url, proxy requests to backend
  //     },
  //   ];
  // },
};
