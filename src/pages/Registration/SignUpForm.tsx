import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signupUser } from '../../api/userApi';
import { useAuth } from '../../Context/useAuth';
import { useNavigate } from 'react-router-dom';

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
  const { loginUser } = useAuth(); // Use login function from the auth context
  const navigate = useNavigate();

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
          // Call the signup API
          const response = await signupUser(values);
          console.log('User successfully signed up:', response);

          // Automatically log in the user
          await loginUser(values.email, values.password);

          // Navigate to the desired page
          navigate('/products');
        } catch (error) {
          console.error('Signup or login failed:', error);
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
              className="form-input mt-1 pl-2 block w-full bg-gray border-gray-600 rounded-md text-charcoal"
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
              className="form-input mt-1 pl-2 block w-full bg-gray border-gray-600 rounded-md text-charcoal"
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
            className="form-input mt-1 pl-2 block w-full bg-gray border-gray-600 rounded-md text-charcoal"
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
            className="form-input mt-1 pl-2 block w-full bg-gray border-gray-600 rounded-md text-charcoal"
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
            className="form-input mt-1 pl-2 block w-full bg-gray border-gray-600 rounded-md text-charcoal"
          />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm mt-1" />
        </div>

        <button
          type="submit"
          className="bg-teal-dark text-white px-4 py-2 rounded-lg w-full hover:bg-teal transition duration-300 font-semibold"
        >
          Sign Up
        </button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
