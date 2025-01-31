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
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");

    if (storedUser && storedToken && tokenTimestamp) {
      const currentTime = new Date().getTime();
      const storedTime = parseInt(tokenTimestamp, 10);
      const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (currentTime - storedTime > expirationTime) {
        logout(); // Token expired, log out the user
      } else {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken; // Restore token after refresh
      }
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

      const token = userData.token || "";
      const timestamp = new Date().getTime(); // Store login time

      localStorage.setItem("token", token);
      localStorage.setItem("tokenTimestamp", timestamp.toString());
      
      const userObj = { email: userData.email };
      localStorage.setItem("user", JSON.stringify(userObj));

      setToken(token);
      setUser(userObj);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

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
      const timestamp = new Date().getTime(); // Store login time

      localStorage.setItem("token", token);
      localStorage.setItem("tokenTimestamp", timestamp.toString());
      
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      const userObj = { email };
      localStorage.setItem("user", JSON.stringify(userObj));
      setToken(token);
      setUser(userObj);

      toast.success("Login Successful!");
      navigate("/search");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const isLoggedIn = () => {
    return !!user && !!token;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTimestamp");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
