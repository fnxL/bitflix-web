/* eslint-disable import/no-unresolved */
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/globals.css';
import Layout from '../components/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
    },
  },
});

function MyApp({ Component, pageProps }) {
  switch (Component.name) {
    case 'Watch':
      return (
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      );
    default:
      return (
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </Layout>
        </QueryClientProvider>
      );
  }
}

export default MyApp;
