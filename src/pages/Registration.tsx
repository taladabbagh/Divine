import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// validation Schema for Sign Up
const signUpValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required')
});

// validation Schema for Log In
const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const Registration: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Log In and Sign Up

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-teal-900 text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
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
                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
                <Field type="email" id="email" name="email" className="form-input mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm text-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 font-medium mb-2">Password</label>
                <Field type="password" id="password" name="password" className="form-input mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm text-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
                <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <button type="submit" className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg w-full hover:bg-teal-400 transition duration-300 font-semibold shadow-md">
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
                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
                <Field type="email" id="email" name="email" className="form-input mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm text-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-300 font-medium mb-2">Password</label>
                <Field type="password" id="password" name="password" className="form-input mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm text-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
                <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-300 font-medium mb-2">Confirm Password</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" className="form-input mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm text-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <button type="submit" className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg w-full hover:bg-teal-400 transition duration-300 font-semibold shadow-md">
                Sign Up
              </button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Registration;
