import Link from 'next/link';
import { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useQuery } from 'react-query';
import { Navigation, Pagination } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import useViewport from '../../hooks/useViewport';
import fetcher from '../../query/fetcher';
import RowPoster from '../RowPoster/RowPoster';
import SkeletonElement from '../SkeletonElement/SkeletonElement';
import SkeletonPoster from '../SkeletonPoster/SkeletonPoster';
import styles from './Row.module.css';

function Row({ results, title, isLarge, url, type, genre }) {
  const { width } = useViewport();

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const { data } = useQuery([title, url], () => fetcher(url), {
    enabled: !!url,
  });

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
    loopAdditionalSlides: width >= 1378 ? 5 : width >= 998 ? 3 : width >= 625 ? 2 : 2,
    pagination: true,
    loop: false,
    grabCursor: false,
    draggable: false,
    preventClicksPropagation: true,
    preventClicks: true,
    slideToClickedSlide: false,
    allowTouchMove: true,
  };

  const rightMouseOver = (e) => {
    if (e.currentTarget.classList.contains('right')) {
      e.currentTarget.parentElement.classList.add('is-right');
    } else if (e.currentTarget.classList.contains('left')) {
      e.currentTarget.parentElement.classList.add('is-left');
    }
  };

  const rightMouseOut = (e) => {
    e.currentTarget.parentElement.classList.remove('is-right', 'is-left');
  };

  const insertPositionClassName = (index) => {
    const i = index + 1;

    if (i === 1) return 'left';
    else if (i === 20) return 'right';

    if (width >= 1378) {
      if ([7, 13, 19].includes(i)) return 'left';
      else if ([6, 12, 18].includes(i)) return 'right';
    } else if (width >= 998) {
      if ([5, 9, 13, 17].includes(i)) return 'left';
      else if ([4, 8, 12, 16].includes(i)) return 'right';
    } else if (width >= 768) {
      if ([4, 7, 10, 13, 16].includes(i)) return 'left';
      else if ([3, 6, 9, 12, 15, 18].includes(i)) return 'right';
    }
  };

  return (
    <div className="Row block py-[1.5vh] md:py-[3vh]">
      {!results ? (
        <div className={styles.loading}>
          <SkeletonElement type="title" />
          <SkeletonPoster />
        </div>
      ) : (
        <div className={`${styles.Row_header}`}>
          <Link href={`/browse/${type}/${genre}`}>
            <a className="flex items-center text-center h-[1vw] cursor-pointer">
              <div>{title}</div>
              <div className={styles.explore_all}>Explore all</div>
              <div className={`${styles.chevron}`} />
            </a>
          </Link>
        </div>
      )}

      {results && (
        <div className="poster_wrap flex relative">
          <div className={`${styles.slider_mask} ${styles.left} left`} ref={navigationPrevRef}>
            <MdChevronLeft
              className={styles.slider_mask_icon}
              size="3em"
              style={{ color: 'white' }}
            />
          </div>
          <div className={`${styles.slider_mask} ${styles.right} right`} ref={navigationNextRef}>
            <MdChevronRight
              size="3em"
              style={{ color: 'white' }}
              className={styles.slider_mask_icon}
            />
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            {...customSwiperParams}
            spaceBetween={5}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
          >
            {results &&
              results.map((result, i) => (
                <SwiperSlide
                  key={result.id}
                  className={insertPositionClassName(i)}
                  onMouseOver={rightMouseOver}
                  onMouseOut={rightMouseOut}
                >
                  <RowPoster item={result} type={type} isLarge={isLarge} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Row;
