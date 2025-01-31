import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center   p-6">
      <h2 className="text-lg  text-gray-800 mb-4">You are not logged in</h2>
      <button
        onClick={() => navigate('/register')}
        className="bg-gold shadow-2xl  text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
      >
        Log In or Sign Up
      </button>
    </div>
  );
};

export default LoginButton;
