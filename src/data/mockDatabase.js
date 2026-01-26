/**
 * Mock Database for Development
 * This file provides mock data when backend is not available
 */

// Mock database storage
export const mockDatabase = {
  users: [],
  events: [],
  proposals: [],
  messages: [],
  photos: [],
};

// Database helper functions
export const dbHelpers = {
  // User helpers
  findUser: (email, password) => {
    return mockDatabase.users.find(
      (u) => u.email === email && u.password === password,
    );
  },

  createUser: (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    mockDatabase.users.push(newUser);
    return newUser;
  },

  // Event helpers
  findEvent: (eventId) => {
    return mockDatabase.events.find((e) => e.id === eventId);
  },

  createEvent: (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      createdAt: new Date().toISOString(),
    };
    mockDatabase.events.push(newEvent);
    return newEvent;
  },

  // Generic helpers
  findById: (collection, id) => {
    return mockDatabase[collection]?.find((item) => item.id === id);
  },

  findAll: (collection) => {
    return mockDatabase[collection] || [];
  },
};
