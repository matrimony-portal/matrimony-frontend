import { database, dbHelpers } from "../data/index.js";

// User Service Mocks
export const mockUserService = {
  getProfile: async (userId) => {
    await dbHelpers.delay();
    // If userId is provided, find that user, otherwise get current user from auth
    if (userId) {
      const user = database.users.find((u) => u.id === userId);
      if (!user) throw new Error("User not found");
      const profile = dbHelpers.findProfileByUserId(userId);
      return { ...user, ...profile };
    }
    // Return mock current user profile
    const mockUser =
      database.users.find((u) => u.role === "user") || database.users[0];
    const profile = dbHelpers.findProfileByUserId(mockUser.id);
    return { ...mockUser, ...profile };
  },

  updateProfile: async (profileData) => {
    await dbHelpers.delay();
    // In a real implementation, this would update the profile
    // For mock, just return the updated data
    return {
      ...profileData,
      updatedAt: new Date().toISOString(),
    };
  },

  searchUsers: async (filters) => {
    await dbHelpers.delay();
    return database.users.filter(
      (user) => user.role === "user" && user.id !== filters?.excludeUserId,
    );
  },
};

// Admin Service Mocks
export const mockAdminService = {
  getStats: async () => {
    await dbHelpers.delay();
    return {
      totalUsers: database.users.filter((u) => u.role === "user").length,
      activeOrganizers: database.users.filter(
        (u) => u.role === "organizer" && u.status === "active",
      ).length,
      successStories: database.successStories.length,
      pendingReports: database.reports.filter((r) => r.status === "pending")
        .length,
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
    database.users.push(newOrganizer);
    return newOrganizer;
  },

  updateOrganizer: async (id, data) => {
    await dbHelpers.delay();
    const index = database.users.findIndex(
      (u) => u.id === id && u.role === "organizer",
    );
    if (index === -1) throw new Error("Organizer not found");

    database.users[index] = {
      ...database.users[index],
      ...data,
    };
    return database.users[index];
  },
};

// Event Service Mocks
export const mockEventService = {
  getEvents: async () => {
    await dbHelpers.delay();
    return database.events;
  },

  createEvent: async (eventData) => {
    await dbHelpers.delay();
    const newEvent = {
      id: dbHelpers.generateId("evt"),
      ...eventData,
      status: "upcoming",
      createdAt: new Date().toISOString(),
    };
    database.events.push(newEvent);
    return newEvent;
  },
};

// Success Story Service Mocks
export const mockSuccessStoryService = {
  getStories: async () => {
    await dbHelpers.delay();
    return database.successStories;
  },

  createStory: async (storyData) => {
    await dbHelpers.delay();
    const newStory = {
      id: dbHelpers.generateId("story"),
      ...storyData,
      status: "draft",
      createdAt: new Date().toISOString(),
    };
    database.successStories.push(newStory);
    return newStory;
  },

  updateStory: async (id, data) => {
    await dbHelpers.delay();
    const index = database.successStories.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Story not found");

    database.successStories[index] = {
      ...database.successStories[index],
      ...data,
    };
    return database.successStories[index];
  },
};
