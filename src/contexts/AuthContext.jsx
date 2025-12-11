import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      const role = authService.getUserRole();
      const userId = authService.getUserId();

      if (isAuth && role && userId) {
        setUser({
          id: userId,
          role: role,
        });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.status === 'success') {
        // Support different field names from backend
        const { id, role, fullname, avatarUrl, avatar_url } = response.data;
        const avatarURL = avatar_url || avatarUrl || null;
        
        setUser({
          id,
          role,
          fullname: fullname || '',
          avatar_url: avatarURL,
        });

        // Navigate based on role
        if (role === 'Admin') {
          navigate('/admin/dashboard');
        } else if (role === 'Manager') {
          navigate('/manager/dashboard');
        } else if (role === 'Sales') {
          navigate('/sales/dashboard');
        }

        return { success: true };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout locally even if API call fails
      setUser(null);
      navigate('/');
    }
  };

  const updateUserProfile = (profileData) => {
    setUser((prevUser) => ({
      ...prevUser,
      fullname: profileData.fullname || prevUser.fullname,
      avatar_url: profileData.avatar_url || prevUser.avatar_url,
    }));
  };

  const value = {
    user,
    login,
    logout,
    updateUserProfile,
    loading,
    isAuthenticated: authService.isAuthenticated(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
