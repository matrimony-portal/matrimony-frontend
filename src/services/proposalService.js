import api from "./api.js";

export const proposalService = {
  sendProposal: async (receiverId, message) => {
    const response = await api.post("/proposals", {
      receiverId,
      message,
    });
    return response.data;
  },

  getReceivedProposals: async () => {
    const response = await api.get("/proposals/received");
    return response.data;
  },

  getSentProposals: async () => {
    const response = await api.get("/proposals/sent");
    return response.data;
  },

  respondToProposal: async (proposalId, status, message) => {
    const response = await api.put(`/proposals/${proposalId}/respond`, {
      status,
      message,
    });
    return response.data;
  },

  deleteProposal: async (proposalId) => {
    const response = await api.delete(`/proposals/${proposalId}`);
    return response.data;
  },
};
