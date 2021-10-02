// eslint-disable-next-line import/no-extraneous-dependencies
import { useToast } from '@chakra-ui/toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '../../utils/auth';
import InputField from '../Input/Input';
import Loader from '../Loader/Loader';

function SignUp({ setIsSignedUp }) {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'onTouched',
  });
  const onSubmit = async (data) => {
    delete data.check_password;
    setIsLoading(true);
    const response = await signUp(data);
    if (response.status === 'success') {
      toast({
        title: 'Account created successfully.',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });

      setIsLoading(false);
      setIsSignedUp(true);
    } else {
      toast({
        title: response.message,
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
      <form className="SignUp__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="wrapper">
          <InputField
            type="text"
            name="firstName"
            placeholder="First Name"
            validationMessage="Please enter your first name."
            register={register}
            errors={errors}
            required
            disabled={isLoading}
          />
        </div>
        <div className="wrapper">
          <InputField
            type="text"
            name="lastName"
            placeholder="Last Name"
            register={register}
            validationMessage="Please enter your last name."
            errors={errors}
            disabled={isLoading}
            required
          />
        </div>
        <div className="wrapper">
          <InputField
            type="text"
            name="username"
            placeholder="Username"
            register={register}
            validationMessage="Please enter your username"
            errors={errors}
            disabled={isLoading}
            required
          />
        </div>
        <div className="wrapper">
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            validationMessage="The password should have a length between 4 and 30 characters."
            register={register}
            required
            errors={errors}
            minLength={4}
            maxLength={30}
            disabled={isLoading}
          />
        </div>
        <div className="wrapper">
          <InputField
            type="password"
            name="check_password"
            placeholder="Configm your password"
            validationMessage="Passwords should match"
            register={register}
            errors={errors}
            validate={{
              matchPassword: (value) => {
                const { password } = getValues();
                return (value && password === value) || 'Passwords do not match!';
              },
            }}
            disabled={isLoading}
          />
        </div>
        <div className="wrapper">
          <InputField
            type="text"
            name="invitekey"
            placeholder="Private Invite Key"
            register={register}
            validationMessage="Please enter an Invite key"
            errors={errors}
            disabled={isLoading}
            required
          />
        </div>
        <button
          type="submit"
          className={`button button__submit ${isLoading && 'loading'}`}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : 'Sign Up'}
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

          .wrapper {
            margin: 0.6em 0;
          }
        `}</style>
      </form>
    </>
  );
}

export default SignUp;
