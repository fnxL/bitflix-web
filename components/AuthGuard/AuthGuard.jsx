/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { isExpired } from 'react-jwt';
import useStore from '../../store/store';

const AuthGuard = (WrappedComponent) => (props) => {
  const getLayout = WrappedComponent.getLayout || ((page) => page);
  if (typeof window !== 'undefined') {
    const router = useRouter();
    const token = Cookies.get('x-auth-token');
    const user = Cookies.get('user');
    const isTokenExpired = isExpired(token);

    if (!token || isTokenExpired) {
      Cookies.remove('x-auth-token');
      Cookies.remove('user');
      router.replace('/login');
      return null;
    }
    if (user) useStore.setState({ user: JSON.parse(user) });

    return getLayout(<WrappedComponent {...props} />);
  }
  return null;
};

export default AuthGuard;
