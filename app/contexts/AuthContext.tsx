import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from '@remix-run/react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
}

interface JWTPayload {
  sub: string;
  email: string;
  exp: number;
  [key: string]: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      // Decode the JWT token
      const decodedToken = jwtDecode<JWTPayload>(token);

      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      // Token is valid, set user data
      const userData = {
        email: decodedToken.email || decodedToken.sub, 
        ...decodedToken
      };

      setIsAuthenticated(true);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    } catch (error) {
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password,
      });

      const { token } = response.data;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Decode the token and set user data
      const decodedToken = jwtDecode<JWTPayload>(token);
      const userData = {
        email: decodedToken.email || decodedToken.sub, 
        ...decodedToken
      };

      setIsAuthenticated(true);
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error during login');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}