import api from './api';

export const userService = {
  // Get all users (Admin only)
  async getAllUsers(params = {}) {
    try {
      const { role, isActive, search, page = 1, limit = 10 } = params;
      
      const queryParams = new URLSearchParams();
      if (role) queryParams.append('role', role);
      if (isActive !== undefined) queryParams.append('isActive', isActive);
      if (search) queryParams.append('search', search);
      queryParams.append('page', page);
      queryParams.append('limit', limit);

      const response = await api.get(`/api/users?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },

  // Get user by ID (Admin only)
  async getUserById(userId) {
    try {
      const response = await api.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user' };
    }
  },

  // Create new user (Admin only)
  async createUser(userData) {
    try {
      const response = await api.post('/api/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create user' };
    }
  },

  // Update user (Admin only)
  async updateUser(userId, userData) {
    try {
      const response = await api.put(`/api/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user' };
    }
  },

  // Delete user (Admin only)
  async deleteUser(userId) {
    try {
      const response = await api.delete(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete user' };
    }
  },

  // Get user activities (Admin only)
  async getUserActivities(userId, limit = 1) {
    try {
      const response = await api.get(`/api/users/${userId}/activities?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user activities' };
    }
  },

  // Get user statistics (Admin only)
  async getUserStats() {
    try {
      const response = await api.get('/api/users/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user statistics' };
    }
  },
};

export default userService;
