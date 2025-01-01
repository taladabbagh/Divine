import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const signUpValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
});

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const Registration: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-900 to-teal-900 text-white">
      <div className="flex bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        {/* Logo Section */}
        <div className="hidden md:flex items-center w-1/3 bg-teal-800 p-6">
          <img
            src="/logo.png"
            alt="Shop Logo"
            className="w-48 h-auto object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-2/3 p-8 ">
          <div className="flex justify-center mb-6 space-x-2">
            <button
              className={`px-4 py-2 ${isLogin ? 'bg-teal-500 text-gray-900' : 'bg-gray-200 text-gray-700'} rounded-l-lg font-semibold focus:outline-none`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`px-4 py-2 ${!isLogin ? 'bg-teal-500 text-gray-900' : 'bg-gray-200 text-gray-700'} rounded-r-lg font-semibold focus:outline-none`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? (
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginValidationSchema}
              onSubmit={(values) => {
                console.log('Log In data', values);
              }}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-input mt-1 pl-2 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm  text-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 focus:outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-input mt-1 pl-2 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:outline-none text-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg w-full hover:bg-teal-400 transition duration-300 font-semibold shadow-md"
                >
                  Log In
                </button>
              </Form>
            </Formik>
          ) : (
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={signUpValidationSchema}
              onSubmit={(values) => {
                console.log('Sign Up data', values);
              }}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-input mt-1 pl-2 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm text-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 focus:outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-input mt-1 pl-2 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm text-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 focus:outline-none"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-300 font-medium mb-2">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input mt-1 pl-2 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm text-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 focus:outline-none"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg w-full hover:bg-teal-400 transition duration-300 font-semibold shadow-md"
                >
                  Sign Up
                </button>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
