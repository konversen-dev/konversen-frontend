import api from './api';

export const authService = {
  // Login
  async login(email, password) {
    try {
      const response = await api.post('/api/authentications', {
        email,
        password,
      });
      
      if (response.data.status === 'success') {
        const { accessToken, refreshToken, id, role } = response.data.data;
        
        // Simpan ke localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', id);
        localStorage.setItem('role', role);
        
        return response.data;
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Logout
  async logout() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        await api.delete('/api/authentications', {
          data: { refreshToken }
        });
      }
      
      // Clear semua localStorage dan sessionStorage
      localStorage.clear();
      sessionStorage.clear();
      
      return { success: true };
    } catch (error) {
      // Tetap clear storage meskipun API call gagal
      localStorage.clear();
      sessionStorage.clear();
      
      throw error.response?.data || { message: 'Logout failed' };
    }
  },

  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await api.put('/api/authentications', {
        refreshToken,
      });
      
      if (response.data.status === 'success') {
        const { accessToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        return response.data;
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Token refresh failed' };
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  },

  // Get current user role
  getUserRole() {
    return localStorage.getItem('role');
  },

  // Get current user ID
  getUserId() {
    return localStorage.getItem('userId');
  },
};

export default authService;
