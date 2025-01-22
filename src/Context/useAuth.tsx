import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../types/types";
import { useNavigate } from "react-router-dom";
import { signupUser, loginUser as loginAPI } from "../api/userApi";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (firstName: string, lastName: string, email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      console.log("token: ", token);
      console.log("user: ", user);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    firstName: string,  
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const userData = await signupUser({ firstName, lastName, email, password });
      localStorage.setItem("token", userData.token || "");
      const userObj = {
        email: userData.email,
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      setToken(userData.token || null);
      setUser(userObj);
      toast.success("Registration Successful!");
      navigate("/search");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const token = await loginAPI({ email, password });
      localStorage.setItem('token', token);
  
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  
      const userObj = { email };
      localStorage.setItem('user', JSON.stringify(userObj));
      setToken(token);
      setUser(userObj);
    
      toast.success('Login Successful!');
      navigate('/search');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };
  
  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
