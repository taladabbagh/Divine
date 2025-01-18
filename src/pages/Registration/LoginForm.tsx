import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await loginUser(values);
          console.log('User successfully logged in:', response);
          navigate('/products');
        } catch (error) {
          console.error('Login failed:', error);
          alert('Failed to log in. Please try again.');
        } finally {
          setSubmitting(false);
        }
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
            className="form-input mt-1 pl-2 block w-full bg-gray-800 border-gray-600 rounded-md text-gray-300"
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
            className="form-input mt-1 pl-2 block w-full bg-gray-800 border-gray-600 rounded-md text-gray-300"
          />
          <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
        </div>

        <button
          type="submit"
          className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg w-full hover:bg-teal-400 transition duration-300 font-semibold"
        >
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;