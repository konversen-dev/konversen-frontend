import api from './api';

const campaignService = {
  // Create campaign (Manager only)
  createCampaign: async (campaignData) => {
    const response = await api.post('/api/campaigns', campaignData);
    return response.data;
  },

  // Get all campaigns with filters and pagination
  getCampaigns: async (params = {}) => {
    const response = await api.get('/api/campaigns', { params });
    return response.data;
  },

  // Get campaign by ID
  getCampaignById: async (id) => {
    const response = await api.get(`/api/campaigns/${id}`);
    return response.data;
  },

  // Update campaign (Owner only)
  updateCampaign: async (id, campaignData) => {
    const response = await api.put(`/api/campaigns/${id}`, campaignData);
    return response.data;
  },

  // Delete campaign (Owner only)
  deleteCampaign: async (id) => {
    const response = await api.delete(`/api/campaigns/${id}`);
    return response.data;
  },

  // Get campaigns for dropdown
  getCampaignsDropdown: async () => {
    const response = await api.get('/api/campaigns/dropdown');
    return response.data;
  },

  // Get campaign statistics for dashboard
  getCampaignStats: async () => {
    const response = await api.get('/api/campaigns/dashboard/stats');
    return response.data;
  }
};

export default campaignService;
