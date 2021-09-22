import { useRef, useState } from 'react';
import useEventListener from '../../hooks/useEventListener';

function TestRange() {
  const [seeked, setSeeked] = useState('0%');
  const [buffered, setBuffered] = useState('0%');
  const seekbar = useRef();

  const handleMouseDown = (e) => {
    updateBar(e.pageX);
  };
  const updateBar = (x) => {
    let position = x - seekbar.current.offsetLeft;
    let percentage = (100 * position) / seekbar.current.offsetWidth;
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }

    setSeeked(`${percentage}%`);
  };

  useEventListener('mousedown', handleMouseDown, seekbar.current);

  return (
    <div>
      <div
        data-uia="timeline-bar"
        ref={seekbar}
        className="timeline_bar h-[3.75px] relative top-10 w-full flex items-center"
        style={{ backgroundColor: 'gray', transition: 'height 0.2s ease 0s' }}
      >
        <div
          className="buffered_bar absolute h-full top-0"
          style={{ backgroundColor: 'lightgray', width: buffered }}
        />
        <div
          className="seeked_bar ltr-1c4ubff h-full left-0 top-0 absolute"
          style={{ backgroundColor: 'red', width: seeked }}
        />
        <div
          aria-label="slider"
          style={{
            transform: 'translateY(-50%)',
            backgroundColor: 'red',
            transition: 'transform 0.2s ease 0s',
            left: `calc(seeked - 7.5px)`,
          }}
          className="w-[15px] h-[15px] rounded-full absolute top-[50%]"
        />
      </div>
    </div>
  );
}

export default TestRange;
