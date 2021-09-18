import { useState } from 'react';
import styles from './Dropdown.module.css';

function Dropdown({ options, selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsActive(!isActive)}
        className={`${styles.dropdown_btn} ${isActive && styles.dropdown_active}`}
      >
        {selected.name}
      </button>
      {isActive && (
        <ul className={`${styles.dropdown_menu}`}>
          {options.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setSelected(item);
                setIsActive(!isActive);
              }}
              className={`${styles.dropdown_item}`}
            >
              <div className="season flex items-center">
                {item.name} &nbsp;&nbsp;
                <span className="episodeLabel font-normal">({item.episode_count} Episodes)</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
