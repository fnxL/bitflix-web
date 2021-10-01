/* eslint-disable object-shorthand */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'assets.stickpng.com',
      'images.pexels.com',
      'image.tmdb.org',
      'ih1.redbubble.net',
      'i.stack.imgur.com',
    ],
  },
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
    PROXY_URL: 'http://127.0.0.1:3000/api', // cloudflare end url
    SERVER_URL: 'http://localhost:5000/api',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // server url, proxy requests to backend
      },
    ];
  },
};
