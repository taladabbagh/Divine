import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signupUser } from '../../api/userApi';

const signUpValidationSchema = Yup.object({
  firstName: Yup.string().min(2, 'First name must be at least 2 characters').required('Required'),
  lastName: Yup.string().min(2, 'Last name must be at least 2 characters').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
});

const SignUpForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signUpValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await signupUser(values);
          console.log('User successfully signed up:', response);
          alert('Registration successful!');
        } catch (error) {
          console.error('Signup failed:', error);
          alert('Failed to sign up. Please try again.');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Form>
        <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1 mb-4 sm:mb-0">
            <label htmlFor="firstName" className="block text-gray-300 font-medium mb-2">
              First Name
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="form-input mt-1 pl-2 block w-full bg-gray-800 border-gray-600 rounded-md text-gray-300"
            />
            <ErrorMessage name="firstName" component="div" className="text-red-400 text-sm mt-1" />
          </div>

          <div className="flex-1">
            <label htmlFor="lastName" className="block text-gray-300 font-medium mb-2">
              Last Name
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="form-input mt-1 pl-2 block w-full bg-gray-800 border-gray-600 rounded-md text-gray-300"
            />
            <ErrorMessage name="lastName" component="div" className="text-red-400 text-sm mt-1" />
          </div>
        </div>

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

        <div className="mb-4">
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

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-300 font-medium mb-2">
            Confirm Password
          </label>
          <Field
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input mt-1 pl-2 block w-full bg-gray-800 border-gray-600 rounded-md text-gray-300"
          />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm mt-1" />
        </div>

        <button
          type="submit"
          className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg w-full hover:bg-teal-400 transition duration-300 font-semibold"
        >
          Sign Up
        </button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
