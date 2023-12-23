/* eslint-disable react/jsx-props-no-spreading */

import { useMutation } from '@apollo/client';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../providers/AuthProvider';
import userRequests from '../api/userRequests';
import {
  UserRegistrationFormData,
  userRegistrationFormSchema,
} from '../interfaces/User';

import '../styles/user.css';

function Register() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserRegistrationFormData>({
    resolver: zodResolver(userRegistrationFormSchema),
  });

  const [registerUser] = useMutation(userRequests.REGISTER);

  const submit = async (data: FieldValues) => {
    const result = await registerUser({
      variables: { email: data.email, password: data.password },
    });

    if (result.data) {
      setToken(result.data.registerUser.user.authenticationToken);
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
            <h1>Register</h1>
          </header>
          <form onSubmit={handleSubmit(submit)}>
            <span className={errors.email ? 'warning' : ''}>
              Email {errors.email && `${errors.email.message}`}
            </span>
            <input {...register('email')} autoComplete="email" />
            <span className={errors.password ? 'warning' : ''}>
              Password {errors.password && `${errors.password.message}`}
            </span>
            <input
              {...register('password')}
              type="password"
              autoComplete="off"
            />
            <span className={errors.confirmPassword ? 'warning' : ''}>
              Confirm
              {errors.confirmPassword && `${errors.confirmPassword.message}`}
            </span>
            <input
              {...register('confirmPassword')}
              type="password"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary-solid"
            >
              Register
            </button>
          </form>
        </article>
      </main>
    </>
  );
}

export default Register;
