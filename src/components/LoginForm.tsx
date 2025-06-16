/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useAppContext } from '../hooks/useAppContext';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import ForgotPassword from './ForgotPassword';

const LoginForm = () => {
  const { setShowlogin, setUser } = useAppContext();
  const [state, setState] = React.useState<'login' | 'register'>('login');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email format.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect email or password.';
      case 'auth/email-already-in-use':
        return 'This email is already registered.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/popup-closed-by-user':
        return 'Popup closed before signing in.';
      case 'auth/network-request-failed':
        return 'Network error. Please try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      let userCredential;

      if (state === 'register') {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      const user = userCredential.user;
      const token = await user.getIdToken();

      setUser({
        name: user.displayName || name,
        email: user.email || '',
        token,
      });

      toast.success(
        `${state === 'login' ? 'Logged in' : 'Registered'} successfully`
      );
      setShowlogin(false);
    } catch (error: any) {
      const code = error?.code || '';
      toast.error(getErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      setUser({
        name: user.displayName || '',
        email: user.email || '',
        token,
      });

      toast.success('Logged in with Google');
      setShowlogin(false);
    } catch (error: any) {
      const code = error?.code || '';
      toast.error(getErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowlogin(false)}
      className="fixed top-0 flex items-center bottom-0 right-0 left-0 z-30 text-sm text-gray-600 bg-black/50"
    >
      {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{' '}
          {state === 'login' ? 'Login' : 'Sign Up'}
        </p>

        {state === 'register' && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        <p>
          {state === 'register'
            ? 'Already have an account?'
            : 'Create an account?'}{' '}
          <span
            onClick={() => setState(state === 'login' ? 'register' : 'login')}
            className="text-primary cursor-pointer"
          >
            click here
          </span>
        </p>
        {state === 'login' && (
          <p
            onClick={() => setShowForgotPassword(true)}
            className="text-primary cursor-pointer text-sm"
          >
            Forgot password?
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          {loading
            ? 'Please wait...'
            : state === 'register'
              ? 'Create Account'
              : 'Login'}
        </button>

        <div className="text-center w-full text-gray-500">or</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="border border-gray-300 hover:bg-gray-50 transition-all w-full py-2 rounded-md cursor-pointer"
        >
          {loading ? 'Please wait...' : 'Sign in with Google'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
