import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, introspectToken, getMyInfo } from '../api/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const loginUser = async (username, password) => {
    try {
      const authResponse = await login(username, password);
      if (authResponse.token) {
        await AsyncStorage.setItem('token', authResponse.token);
        setToken(authResponse.token);
        const decoded = jwtDecode(authResponse.token);
        const userInfo = await getMyInfo();
        setUser({ ...decoded, ...userInfo });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userData');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };
    // const logout = async () => {
    //   try {
    //     await AsyncStorage.clear(); // Xóa toàn bộ AsyncStorage
    //     setToken(null);
    //     setUser(null);  
    //   } catch (error) {
    //     console.error('Logout error:', error.message);
    //   }
    // };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          const decoded = jwtDecode(storedToken);
          const introspectResponse = await introspectToken(storedToken);
          if (introspectResponse.valid && decoded.exp * 1000 > Date.now()) {
            const userInfo = await getMyInfo();
            setUser({ ...decoded, ...userInfo });
            setToken(storedToken);
          } else {
            await logout();
          }
        }
      } catch (error) {
        console.error('Token validation error:', error.message);
        await logout();
      }
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login: loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);