import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaChevronDown, FaMinus, FaPlay, FaPlus } from 'react-icons/fa';
import useGenreConversion from '../../hooks/useGenreConversion';
import useStore from '../../store/store';
import { getFallBackTitle } from '../../utils/utils';

const BACKDROP_URL = process.env.BACKDROP_URL;
const FALLBACK_URL = process.env.FALLBACK_URL;

function RowPoster(result) {
  const router = useRouter();
  const {
    item,
    item: {
      id,
      title,
      original_name,
      original_title,
      name,
      genre_ids,
      poster_path,
      backdrop_path,
    },
    isLarge,
    isFavourite,
    type,
  } = result;
  let fallbackTitle = getFallBackTitle(item);
  const genresConverted = useGenreConversion(genre_ids);

  const setModalContent = useStore((state) => state.setModalContent);

  const handleModalOpening = (e) => {
    e.stopPropagation();
    setModalContent({
      ...item,
      fallbackTitle,
      genresConverted,
      type,
      isFavourite,
    });
  };

  const handleRedirect = () => {
    router.push(`/${type}/${id}`);
  };

  return (
    <div
      className={`Row__poster relative w-full h-44 ${isLarge && 'h-[461px]'}`}
      onClick={handleRedirect}
    >
      {isLarge ? (
        poster_path ? (
          <Image
            src={`${BACKDROP_URL}${poster_path}`}
            alt={fallbackTitle}
            layout='fill'
            objectFit='cover'
          />
        ) : (
          ''
        )
      ) : backdrop_path ? (
        <Image
          src={`${BACKDROP_URL}${backdrop_path}`}
          alt={fallbackTitle}
          layout='fill'
          objectFit='cover'
        />
      ) : (
        <>
          <Image
            src={FALLBACK_URL}
            alt={fallbackTitle}
            layout='fill'
            objectFit='cover'
          />
          <div className='Row__poster__fallback'>
            <span>{fallbackTitle}</span>
          </div>
        </>
      )}
      <div className='Row__poster-info'>
        <div className='Row__poster-info--iconswrp'>
          <button className='Row__poster-info--icon icon--play'>
            <FaPlay />
          </button>
          {!isFavourite ? (
            <button className='Row__poster-info--icon icon--favourite'>
              <FaPlus />
            </button>
          ) : (
            <button className='Row__poster-info--icon icon--favourite'>
              <FaMinus />
            </button>
          )}
          <button
            onClick={handleModalOpening}
            className='Row__poster-info--icon icon--toggleModal'
          >
            <FaChevronDown />
          </button>
        </div>
        <div className='Row__poster-info--title'>
          <h3>{fallbackTitle}</h3>
        </div>
        <div className='Row__poster-info--genres'>
          {genresConverted &&
            genresConverted.map((genre) => (
              <span key={`Genre--id_${genre}`} className='genre-title'>
                {genre}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RowPoster;
