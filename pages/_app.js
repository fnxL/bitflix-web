import { useEffect } from 'react';
import useStore from '../store/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const setIsMobile = useStore((state) => state.setIsMobile);

  useEffect(() => {
    setIsMobile();
  }, [setIsMobile]);
  return <Component {...pageProps} />;
}

export default MyApp;
