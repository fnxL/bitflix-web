import { useState, useEffect } from 'react';

const useViewport = () => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    if (!width && !height) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { width, height };
};

export default useViewport;
