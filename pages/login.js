import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect} from 'react';
import { SignUp } from '../components';
import Login from '../components/Login/Login';

function LoginPage() {
  const [isSignedUp, setIsSignedUp] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.replace('/maintenance')
  }, [])
  // Check if cookie is set
  const token = Cookies.get('token');
  if (token) {
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="Auth relative w-full h-[100vh]">
        <div className="Auth__opacityLayer absolute w-full h-full top-0 left-0 bg-[rgba(14, 14, 14, 0.6)] z-[1]" />

        <div className="Auth__content z-[2] md:max-w-[500px] sm:py-[3.75em] sm:px-[3em] transform translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%] w-full max-w-[90%] py-[2em] px-[1.8em] rounded-[8px] bg-[rgba(3,3,3,0.75)]">
          <div>
            <h2 className="Auth__content--title text-[1.2rem] font-bold mb-[1em] sm:text-[1.5rem]">
              {isSignedUp ? 'Sign In' : 'Sign Up'}
            </h2>
            {isSignedUp ? <Login /> : <SignUp setIsSignedUp={setIsSignedUp} />}
            <hr className="Auth__content--divider m-[1.5em] border-[#777]" />
            <small className="Auth__content--toggleView md:text-[16px] text-[14px] leading-[1.4] text-[#747474] text-center">
              {isSignedUp ? `Haven't you registered yet? ` : 'Do you already have an account? '}
              <span
                className="toggler md:text-[16px] inline-block text-[#e50914] text-[14px] font-bold leading-[1.4] cursor-pointer transition-all duration-200 ease-out hover:color"
                onClick={() => setIsSignedUp(!isSignedUp)}
              >
                {isSignedUp ? 'Sign Up' : 'Login'}
              </span>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
