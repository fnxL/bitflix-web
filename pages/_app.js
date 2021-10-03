/* eslint-disable import/no-unresolved */
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/globals.css';
import { useEffect } from 'react';
import { verifyUser } from '../utils/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
    },
  },
});

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = {
  styles: {
    global: {
      'html, body': {
        bg: '#141414',
        color: '#f2f2f2',
      },
    },
  },
  fonts: {
    body: 'Inter',
  },
  ...config,
};

const customTheme = extendTheme(theme);

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      verifyUser(token).then((response) => {
        if (!response.status === 'success') {
          router.replace('/login');
        }
      });
    }
    router.replace('/login');
  }, []);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
