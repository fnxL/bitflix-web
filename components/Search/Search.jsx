import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './search.module.css';

function Search() {
  const [searchInputToggle, setSearchInputToggle] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchbarRef = useRef();
  const searchInputRef = useRef();
  const router = useRouter();

  useOutsideClick(searchbarRef, () => {
    if (searchInputToggle) {
      setSearchInput('');
      setSearchInputToggle(false);
    }
  });

  const handleSearchInputToggle = () => {
    searchInputRef.current.focus();
    setSearchInputToggle(!searchInputToggle);
  };

  const clearSearchInputToggle = () => {
    setSearchInput('');
    router.push('/');
  };

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    if (value.length > 0) {
      router.push({ pathname: '/search', query: { q: value } });
    } else router.push('/');
  };

  return (
    <div className={styles.search} ref={searchbarRef}>
      <input
        type="text"
        placeholder="Search titles, people"
        value={searchInput}
        onChange={handleSearchInput}
        ref={searchInputRef}
        className={`${styles.search_input} ${searchInputToggle && styles.active}`}
      />
      <div className={styles.toggler} onClick={handleSearchInputToggle}>
        <FaSearch size="1.5em" />
      </div>
      <div
        className={`${styles.clear} ${searchInputToggle && searchInput.length && styles.typing}`}
        onClick={clearSearchInputToggle}
      >
        <RiCloseFill />
      </div>
    </div>
  );
}

export default Search;
