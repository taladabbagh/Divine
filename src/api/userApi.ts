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
  export const loginUser = async (loginData: LogIn): Promise<User> =>{
    try{
      const response = await api.post<User>('/auth/login', loginData);
      return response.data;
    }
    catch(error){
      console.log("Error during login: ", error);
      throw error;
    }
  };
