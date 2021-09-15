import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  FaChevronDown,
  FaMinus,
  FaPlay,
  FaPlus,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import useGenreConversion from '../../hooks/useGenreConversion';
import useStore from '../../store/store';
import { getFallBackTitle } from '../../utils/utils';
import Button from '../Button/Button';

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

  return (
    <div className='movie'>
      <img src={`${BACKDROP_URL}${backdrop_path}`} alt='' />
    </div>
  );
}

export default RowPoster;
