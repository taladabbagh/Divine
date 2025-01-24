import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const Registration: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-gradient-to-br from-teal to-gold text-white">
      <div className="flex bg-charcoal rounded-lg shadow-lg overflow-hidden my-2">
        <div className="hidden md:flex items-center w-1/3 bg-teal-dark p-6">
          <img src="/logo.png" alt="Shop Logo" className="w-48 h-auto object-contain" />
        </div>

        <div className="md:w-2/3 p-8">
          <div className="flex justify-center mb-6 space-x-2">
            <button
              className={`px-4 py-2 ${isLogin ? 'bg-teal-dark text-white' : 'bg-gray-200 text-gray-700'} rounded-l-lg font-semibold`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`px-4 py-2 ${!isLogin ? 'bg-teal-dark text-white' : 'bg-gray-200 text-gray-700'} rounded-r-lg font-semibold`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
};

export default Registration;
