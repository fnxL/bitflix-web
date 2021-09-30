# Bitflix

A fullstack working clone of netflix built over Google Drive API & Next.js to stream any title in highest possible quality.

## 🎯 About

This is a fully functional video streaming OTT platform designed to have same the experience as Netflix.

You can choose to click on any title/show/movie to stream in the highest possible quality (likes of 4K, REMUXES, Bluray, HDR 10bit, etc if available) with English Subtitles (if any).

Since the WEB only supports video files which are encoded with x264 codec and firefox only supports .mp4 containers the search is limited to x264 video files so the WEB version has less content than the Android version.

The files are sourced direclty from my Google Drive and sizes range anywhere from 10GB to 80GB.

### Motive

The main motive for this project is to watch content in highest possible quality on my 4K android TV, as quality is everything to make watching experience a feast to the eyes. Each movie release is different and its quality is defined by the SOURCE (REMUX, Bluray, WEBDL, WEBRip, etc), Bitrate, resolution and the audio quality and various other factors. Below is the order from highest quality to lowest ones.

0. REMUXES
1. Bluray/Blu-Ray encodes
2. BDRip
3. WEB-DL
4. BRRip
5. WEBRip
6. HDRip

### Process Flow:

User Clicks a movie/show  
--> Client sends request to server with required details to fetch streamlinks  
--> Server makes a search request under the hood to Google Drive to find video files corresponding to the title  
--> Server then responds with stream links of that title in various qualities depending on the platform (android/web) sorted by file size in descending order.  
--> Client requests for subtitles from the server and then converts the file to VTT (in memory Blob)  
--> Client starts playing the media.
This is possible because of the route which streams/serves the video files directly from google drive, it just needs the ID of the file in google drive.

**This project is intended to be used for personal use only and will not be made public for obvious legal reasons.**

## ✨ Features

✔️ Real netflix experience.  
✔️ Responsive Layout  
✔️ Optimized for maximum performance and least api requests possible.  
✔️ Search for movies and tv shows  
✔️ Movie/TV Shows recommendations  
✔️ Stream movies & tv show in highest possible quality.  
✔️ Ability to change quality & video source.  
✔️ VTT subtitles support from opensubtitles.org (SRT files are converted to VTT on the fly)  
✔️ Awesome netflix like trailer video banner  
✔️ Ability to sign up and sign in  
✔️ Save watch progress and watch list.  
✔️ Automatic Trailer Playback

## 🚀 Technologies

### Front End

- [Next.js 11](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/docs/guides/create-react-app)
- [React Query](https://react-query.tanstack.com/) - For DataFetching
- [Zustand](https://github.com/pmndrs/zustand) - Simple and intuitive global state manager for react
- [srt-webvtt](https://www.npmjs.com/package/srt-webvtt) - Convert SRT to VTT on the fly
- [SwiperJS](https://swiperjs.com/) - Slider
- [ReactPlayer](https://www.npmjs.com/package/react-player) - Main Player for Videos
- [React-Youtube](https://www.npmjs.com/package/react-youtube) - Embedding youtube trailers as background
- [React-Hook-Form](https://react-hook-form.com/) - For easy form validation/handling.
- [js-base64](https://www.npmjs.com/package/js-base64) - base64 transcoder

### Back End

- [NodeJS > 14.17.5](http://nodejs.org)
- [Express](http://expressjs.com/) - For Simple and Robust APIs
- [PostgreSQL](https://www.postgresql.org/) - as RDB.
- [Prisma](https://www.prisma.io/) - Next-gen ORM for PostgreSQL
- [GoogleAPIs](http://expressjs.com/) - To communicate with Drive API
- [Celebrate](https://www.npmjs.com/package/celebrate) - For input validation
- [typedi](https://www.npmjs.com/package/typedi) - Dependency Injection library and to cache class instances of services.
- [Pino](https://getpino.io/#/) - Logging service
- [opensubtitles-api](https://www.npmjs.com/package/opensubtitles-api) - opensubtitles.org api wrapper for nodejs to get subtitles of specific titles.

## Screenshots

### Home Page

![picture 2](https://i.imgur.com/lPta3s3.jpg)

## Details Page

![picture 5](https://i.imgur.com/xh2r0n4.jpg)

## Video Player

![picture 6](https://i.imgur.com/Pj53ojm.jpg)

## To do

- Setup Authentication System and Protect routes
- Abstract Logic from Components , Clean and refactor existing code.
- Multiple Profile System for each user.
- Extract AudioTracks from VideoContainer using the experimental AudioTracks API.
- Play next episode automatically.
- Design a tracking system for tv/shows, watch progress or Integrate with trakt.tv
- Resume video from where user last left off.

## Acknowledgements

- [Fakeflix](https://github.com/Th3Wall/Fakeflix) - Thanks to FakeFlix as many components like navbar, row slider, rowposter, skeletons have been taken directly from this repo.
- [Cloudflare Pages](https://pages.cloudflare.com/) - To allow hosting on their fast global edge network
- [Google Drive API reference](https://developers.google.com/drive/api/v3/reference)
- [Heroku](https://heroku.com) - For backend deployment
- [TMDB API](https://developers.themoviedb.org/3) - Th!
  anks to their free open source api for movies/shows index.
- [Fanart API](http://fanart.tv/) - For HD tv/movie logos
- [Media Type and format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats)
- [Partial Content & Range Requests](https://medium.com/@vishal1909/how-to-handle-partial-content-in-node-js-8b0a5aea216)
