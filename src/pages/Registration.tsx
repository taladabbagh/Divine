import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Validation Schema for Sign Up
const signUpValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required')
});

// Validation Schema for Log In
const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const Registration: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Log In and Sign Up

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-lg focus:outline-none`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={`px-4 py-2 ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-lg focus:outline-none`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          // Log In Form
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              console.log('Log In data', values);
              // Handle login logic here
            }}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <Field type="email" id="email" name="email" className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                <Field type="password" id="password" name="password" className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300">
                Log In
              </button>
            </Form>
          </Formik>
        ) : (
          // Sign Up Form
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={signUpValidationSchema}
            onSubmit={(values) => {
              console.log('Sign Up data', values);
              // Handle sign-up logic here
            }}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <Field type="email" id="email" name="email" className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                <Field type="password" id="password" name="password" className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300">
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
