import { useQuery } from 'react-query';
import fetcher from '../../query/fetcher';
import styles from './Row.module.css';
import RowPoster from '../RowPoster/RowPoster';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import useViewport from '../../hooks/useViewport';
import { useRef } from 'react';
import { HiChevronRight } from 'react-icons/hi';

function Row({ results, title, isLarge, url, type }) {
  const { data, error } = useQuery([title, url], () => fetcher(url), {
    enabled: !!url,
  });
  const { width } = useViewport();

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  if (data) results = data.results;

  const customSwiperParams = {
    observer: true,
    observeParents: true,
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    breakpoints: {
      1378: { slidesPerView: 6, slidesPerGroup: 6 },
      998: { slidesPerView: 4, slidesPerGroup: 4 },
      625: { slidesPerView: 3, slidesPerGroup: 3 },
      330: { slidesPerView: 2, slidesPerGroup: 2 },
      0: { slidesPerView: 1.5, slidesPerGroup: 1.5 },
    },
    loopAdditionalSlides:
      width >= 1378 ? 5 : width >= 998 ? 3 : width >= 625 ? 2 : 2,
    pagination: true,
    loop: false,
    grabCursor: false,
    draggable: false,
    preventClicksPropagation: true,
    preventClicks: true,
    slideToClickedSlide: false,
    allowTouchMove: true,
  };
  console.log(results);

  return (
    <div className='Row block py-[1.5vh] md:py-[3vh]'>
      <div className={`${styles.Row_header}`}>
        <a className='flex items-center text-center h-[1vw] cursor-pointer'>
          <div>{title}</div>
          <div className={styles.explore_all}>Explore all</div>
          <div className={`${styles.chevron}`}></div>
        </a>
      </div>
      <div className='poster_wrap flex relative'>
        <div
          className={`${styles.slider_mask} ${styles.left}`}
          ref={navigationPrevRef}
        >
          <MdChevronLeft
            className={styles.slider_mask_icon}
            size='3em'
            style={{ color: 'white' }}
          />
        </div>
        <div
          className={`${styles.slider_mask} ${styles.right}`}
          ref={navigationNextRef}
        >
          <MdChevronRight
            size='3em'
            style={{ color: 'white' }}
            className={styles.slider_mask_icon}
          />
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          {...customSwiperParams}
          onSwiper={(swiper) => console.log(swiper)}
          spaceBetween={6}
          onSlideChange={() => console.log('slide change')}
        >
          {results &&
            results.map((result) => (
              <SwiperSlide key={result.id}>
                <RowPoster item={result} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Row;
