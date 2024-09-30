import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import Products from './Products';
import { useNavigate } from 'react-router-dom';


interface FormValues {
  name: string;
  email: string;
  address: string;
  paymentMethod: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required'),
  paymentMethod: Yup.string().required('Payment method is required'),
});

const Checkout: React.FC = () => {

  const navigate = useNavigate();

  const initialValues: FormValues = {
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
  };

  const handleSubmit = (values: FormValues, {resetForm}: {resetForm: ()=> void}) => {
    console.log('Order details:', values);
    alert('Order placed successfully!');
    resetForm();
    navigate('/products')
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Checkout</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Address Field */}
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Payment Method Field */}
              <div className="mb-4">
                <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-2">Payment Method</label>
                <Field
                  as="select"
                  id="paymentMethod"
                  name="paymentMethod"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="">Select a payment method</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </Field>
                <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
              >
                Place Order
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Checkout;
