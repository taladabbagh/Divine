import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

const CheckoutForm: React.FC = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
  };

  const handleSubmit = (values: FormValues) => {
    // Handle form submission, e.g., sending data to the server
    console.log('Form submitted:', values);
    alert('Order placed successfully!');
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <Field
                type="text"
                id="address"
                name="address"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage name="address" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
              <Field
                as="select"
                id="paymentMethod"
                name="paymentMethod"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select a payment method</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
              </Field>
              <ErrorMessage name="paymentMethod" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Place Order
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutForm;
