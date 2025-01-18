import axios from 'axios';

  interface SignupDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string; 
  }
  interface LogIn {
    email: string;
    password: string;
  }

  const api = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const signupUser = async (signupData: SignupDTO): Promise<User> => {
    try {
      const response = await api.post<User>('/signup', signupData);
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };
  export const loginUser = async (loginData: LogIn): Promise<string> => {
    try {
        const response = await api.post<string>('/auth/login', loginData);
        const token = response.data; // Assume the backend returns the JWT token
        localStorage.setItem('authToken', token); // Save the token in localStorage
        return token;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

