import api from './api';

export const uploadService = {
  // Upload avatar for current user
  async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/api/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload avatar' };
    }
  },

  // Upload avatar for specific user (Admin only)
  async uploadAvatarForUser(userId, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post(`/api/upload/avatar/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload avatar' };
    }
  },
};

export default uploadService;
