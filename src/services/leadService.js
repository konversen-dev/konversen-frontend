import api from './api';

const leadService = {
  // Get all leads with filters and pagination
  getLeads: async (params = {}) => {
    const response = await api.get('/api/leads', { params });
    return response.data;
  },

  // Get lead by ID
  getLeadById: async (id, campaignId) => {
    const response = await api.get(`/api/leads/${id}`, {
      params: { campaignId }
    });
    return response.data;
  },

  // Update lead status
  updateLeadStatus: async (leadId, status, campaignId) => {
    const response = await api.patch(`/api/leads/${leadId}/status`, 
      { status },
      { params: { campaignId } }
    );
    return response.data;
  },

  // Get lead statistics for dashboard
  getLeadStats: async (params = {}) => {
    const response = await api.get('/api/leads/dashboard/stats', { params });
    return response.data;
  }
};

export default leadService;
