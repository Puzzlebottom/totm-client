/* eslint-disable react/jsx-props-no-spreading */

import { useMutation } from '@apollo/client';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../providers/AuthProvider';
import userRequests from '../api/userRequests';
import { UserLoginFormData, userLoginFormSchema } from '../interfaces/User';

import '../styles/user.css';

function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginFormSchema),
  });

  const [loginUser] = useMutation(userRequests.LOGIN);

  const submit = async (data: FieldValues) => {
    const result = await loginUser({
      variables: { email: data.email, password: data.password },
    });

    if (result.data) {
      setToken(result.data.loginUser.user.authenticationToken);
      reset();
      navigate('/');
    }
  };

  return (
    <>
      <NavBar links={[]} />
      <main className="login-register">
        <article>
          <header>
            <h1>Login</h1>
          </header>
          <form onSubmit={handleSubmit(submit)}>
            <span className={errors.email ? 'warning' : ''}>
              Email {errors.email && `${errors.email.message}`}
            </span>
            <input {...register('email')} />
            <span className={errors.password ? 'warning' : ''}>
              Password {errors.password && `${errors.password.message}`}
            </span>
            <input {...register('password')} type="password" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary-solid"
            >
              Login
            </button>
          </form>
        </article>
      </main>
    </>
  );
}

export default Login;
