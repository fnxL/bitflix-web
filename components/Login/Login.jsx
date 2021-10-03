import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import useStore from '../../store/store';
import { login } from '../../utils/auth';
import InputField from '../Input/Input';
import Loader from '../Loader/Loader';

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = await login(data);

    if (response.status === 'success') {
      toast({
        title: 'Logged in successfully!',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });

      const { token, user } = response;
      Cookies.set('token', token);
      Cookies.set('user', JSON.stringify(user));
      useStore.setState({ user });
      router.push('/');
    } else {
      toast({
        title: 'Invalid Credentials',
        status: 'error',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="SignIn__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="SignIn__form--inputwrp my-[0.6em] mx-0">
          <InputField
            type="text"
            register={register}
            name="username"
            placeholder="Username"
            required
            validationMessage="This field is required"
            errors={errors}
          />
        </div>
        <div className="SignIn__form--inputwrp">
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            register={register}
            required
            validationMessage="This field is required"
            errors={errors}
          />
        </div>
        <button
          type="submit"
          className={`button button__submit ${isLoading && 'loading'}`}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : 'Sign in'}
        </button>
        <style jsx>{`
          .button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            min-height: 45px;
            box-shadow: none;
            border: 1px solid transparent;
            padding: 1.2em 0.8em;
            margin-top: 0.5em;
            border-radius: 5px;
            font-size: 13px;
            font-weight: 500;
            line-height: 1;
            transition: all 0.2s ease-out;
            cursor: pointer;
            background-color: #e50914;
            color: #f2f2f2;
          }

          .button:focus {
            outline: none;
          }

          .button:hover {
            background-color: rgba(229, 9, 20, 0.7);
          }

          .loading {
            background-color: #333;
            border: 1px solid $white;
            cursor: progress;
          }

          .loading:hover {
            background-color: #333;
            transform: none;
          }
        `}</style>
      </form>
    </>
  );
}

export default Login;
