import api from './api';

const noteService = {
  // Create a new note
  createNote: async (noteData) => {
    const response = await api.post('/api/notes', noteData);
    return response.data;
  },

  // Get all notes for a lead
  getNotes: async (params = {}) => {
    const response = await api.get('/api/notes', { params });
    return response.data;
  },

  // Delete a note
  deleteNote: async (noteId) => {
    const response = await api.delete(`/api/notes/${noteId}`);
    return response.data;
  }
};

export default noteService;
