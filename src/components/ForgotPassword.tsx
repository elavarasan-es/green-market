/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ForgotPassword.tsx
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import toast from 'react-hot-toast';

interface Props {
  onClose: () => void;
}

const ForgotPassword: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleReset}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-lg font-medium mb-4">Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4 outline-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded"
        >
          {loading ? 'Sending...' : 'Send Reset Email'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
