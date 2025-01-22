import axios from 'axios';

  export interface SignupDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  export interface User {
    token: string;
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string; 
  }
  export interface LogIn {
    email: string;
    password: string;
  }

  const api = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const signupUser = async (signupData: SignupDTO)=> {
    try {
      const response = await api.post<User>('/signup', signupData);
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };
  export const loginUser = async (loginData: LogIn)=> {
    try {
        const response = await api.post<string>('/auth/login', loginData);
        const token = response.data; 
        localStorage.setItem('authToken', token); 
        return token;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

