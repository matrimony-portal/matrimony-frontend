import { mockDatabase, dbHelpers } from "../data/mockDatabase.js";

// User Service Mocks
export const mockUserService = {
  getProfile: async (userId) => {
    await dbHelpers.delay();
    const user = mockDatabase.users.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    return user;
  },

  updateProfile: async (userId, profileData) => {
    await dbHelpers.delay();
    const userIndex = mockDatabase.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) throw new Error("User not found");

    mockDatabase.users[userIndex] = {
      ...mockDatabase.users[userIndex],
      ...profileData,
    };
    return mockDatabase.users[userIndex];
  },

  searchUsers: async (filters) => {
    await dbHelpers.delay();
    return mockDatabase.users.filter(
      (user) => user.role === "user" && user.id !== filters.excludeUserId,
    );
  },
};

// Admin Service Mocks
export const mockAdminService = {
  getStats: async () => {
    await dbHelpers.delay();
    return {
      totalUsers: mockDatabase.users.length,
      activeOrganizers: mockDatabase.organizers.filter(
        (o) => o.status === "active",
      ).length,
      successStories: mockDatabase.successStories.length,
      pendingReports: 5,
    };
  },

  getUsers: async () => {
    await dbHelpers.delay();
    return dbHelpers.findUsersByRole("user");
  },

  getOrganizers: async () => {
    await dbHelpers.delay();
    return dbHelpers.findUsersByRole("organizer");
  },

  createOrganizer: async (organizerData) => {
    await dbHelpers.delay();
    const newOrganizer = {
      id: dbHelpers.generateId("org"),
      ...organizerData,
      role: "organizer",
      status: "active",
      createdAt: new Date().toISOString(),
    };
    mockDatabase.organizers.push(newOrganizer);
    return newOrganizer;
  },

  updateOrganizer: async (id, data) => {
    await dbHelpers.delay();
    const index = mockDatabase.organizers.findIndex((o) => o.id === id);
    if (index === -1) throw new Error("Organizer not found");

    mockDatabase.organizers[index] = {
      ...mockDatabase.organizers[index],
      ...data,
    };
    return mockDatabase.organizers[index];
  },
};

// Event Service Mocks
export const mockEventService = {
  getEvents: async () => {
    await dbHelpers.delay();
    return mockDatabase.events;
  },

  createEvent: async (eventData) => {
    await dbHelpers.delay();
    const newEvent = {
      id: dbHelpers.generateId("evt"),
      ...eventData,
      status: "upcoming",
      createdAt: new Date().toISOString(),
    };
    mockDatabase.events.push(newEvent);
    return newEvent;
  },
};

// Success Story Service Mocks
export const mockSuccessStoryService = {
  getStories: async () => {
    await dbHelpers.delay();
    return mockDatabase.successStories;
  },

  createStory: async (storyData) => {
    await dbHelpers.delay();
    const newStory = {
      id: dbHelpers.generateId("story"),
      ...storyData,
      status: "draft",
      createdAt: new Date().toISOString(),
    };
    mockDatabase.successStories.push(newStory);
    return newStory;
  },

  updateStory: async (id, data) => {
    await dbHelpers.delay();
    const index = mockDatabase.successStories.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Story not found");

    mockDatabase.successStories[index] = {
      ...mockDatabase.successStories[index],
      ...data,
    };
    return mockDatabase.successStories[index];
  },
};
