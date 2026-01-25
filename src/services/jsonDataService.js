import axios from "axios";

const JSON_DATA_URL = "/data/matrimony-data.json";
const STORAGE_KEY = "matrimony_json_data";

/**
 * Service to handle all data operations using JSON file
 * Uses localStorage as a cache/backend for write operations
 * Reads from JSON file, writes to localStorage
 */
class JsonDataService {
  constructor() {
    this.data = null;
    this.initialized = false;
  }

  /**
   * Initialize data - load from JSON file or localStorage
   */
  async initialize() {
    if (this.initialized) {
      return this.data;
    }

    try {
      // Try to load from localStorage first (if we've written data before)
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        this.data = JSON.parse(storedData);
        this.initialized = true;
        return this.data;
      }

      // Otherwise, load from JSON file
      const response = await axios.get(JSON_DATA_URL);
      this.data = response.data;

      // Initialize localStorage with JSON data if empty
      if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      }

      this.initialized = true;
      return this.data;
    } catch (error) {
      console.error("Error loading JSON data:", error);
      // Fallback to empty structure
      this.data = {
        users: [],
        profiles: [],
        proposals: [],
        shortlist: [],
        blockedUsers: [],
        profileViews: [],
        userActivity: [],
      };
      this.initialized = true;
      return this.data;
    }
  }

  /**
   * Save data to localStorage
   */
  async save() {
    if (!this.data) {
      await this.initialize();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    return this.data;
  }

  /**
   * Get all items of a type
   */
  async getAll(type) {
    await this.initialize();
    return this.data[type] || [];
  }

  /**
   * Get item by ID
   */
  async getById(type, id) {
    await this.initialize();
    const items = this.data[type] || [];
    return items.find((item) => item.id === id);
  }

  /**
   * Get items by filter
   */
  async getByFilter(type, filterFn) {
    await this.initialize();
    const items = this.data[type] || [];
    return items.filter(filterFn);
  }

  /**
   * Create new item
   */
  async create(type, item) {
    await this.initialize();
    if (!this.data[type]) {
      this.data[type] = [];
    }

    const newItem = {
      ...item,
      id: item.id || this.generateId(type),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data[type].push(newItem);
    await this.save();
    return newItem;
  }

  /**
   * Update item
   */
  async update(type, id, updates) {
    await this.initialize();
    const items = this.data[type] || [];
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`${type} with id ${id} not found`);
    }

    this.data[type][index] = {
      ...this.data[type][index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await this.save();
    return this.data[type][index];
  }

  /**
   * Delete item
   */
  async delete(type, id) {
    await this.initialize();
    const items = this.data[type] || [];
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`${type} with id ${id} not found`);
    }

    const deleted = this.data[type].splice(index, 1)[0];
    await this.save();
    return deleted;
  }

  /**
   * Generate unique ID
   */
  generateId(type) {
    const prefix = type.substring(0, 3).toLowerCase();
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}${timestamp}${random}`;
  }

  /**
   * Reset data to original JSON file
   */
  async reset() {
    try {
      const response = await axios.get(JSON_DATA_URL);
      this.data = response.data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      return this.data;
    } catch (error) {
      console.error("Error resetting data:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const jsonDataService = new JsonDataService();

// Export service methods for free user operations
export const freeUserService = {
  // Profile operations
  getProfiles: async (filters = {}) => {
    let profiles = await jsonDataService.getAll("profiles");

    // Apply filters
    if (filters.gender) {
      profiles = profiles.filter((p) => {
        const user = jsonDataService.data?.users?.find(
          (u) => u.id === p.userId,
        );
        return user?.gender === filters.gender;
      });
    }
    if (filters.city) {
      profiles = profiles.filter((p) => p.city === filters.city);
    }
    if (filters.state) {
      profiles = profiles.filter((p) => p.state === filters.state);
    }
    if (filters.ageMin || filters.ageMax) {
      profiles = profiles.filter((p) => {
        const age = p.age;
        if (filters.ageMin && age < filters.ageMin) return false;
        if (filters.ageMax && age > filters.ageMax) return false;
        return true;
      });
    }

    return profiles;
  },

  getProfileById: async (profileId) => {
    return await jsonDataService.getById("profiles", profileId);
  },

  updateProfile: async (profileId, updates) => {
    return await jsonDataService.update("profiles", profileId, updates);
  },

  // Proposal operations
  sendProposal: async (fromUserId, toProfileId) => {
    const proposal = {
      fromUserId,
      toProfileId,
      status: "pending",
      sentAt: new Date().toISOString(),
    };
    return await jsonDataService.create("proposals", proposal);
  },

  getProposals: async (userId) => {
    const proposals = await jsonDataService.getAll("proposals");
    const profiles = await jsonDataService.getAll("profiles");

    // Get current user's profile ID
    const userProfile = profiles.find((p) => p.userId === userId);
    const userProfileId = userProfile?.id;

    // Filter proposals where user is sender OR receiver
    return proposals.filter(
      (p) =>
        p.fromUserId === userId ||
        (userProfileId && p.toProfileId === userProfileId),
    );
  },

  updateProposalStatus: async (proposalId, status) => {
    return await jsonDataService.update("proposals", proposalId, { status });
  },

  // Shortlist operations
  addToShortlist: async (userId, profileId) => {
    const shortlistItem = {
      userId,
      profileId,
      addedAt: new Date().toISOString(),
    };
    return await jsonDataService.create("shortlist", shortlistItem);
  },

  removeFromShortlist: async (userId, profileId) => {
    const shortlist = await jsonDataService.getAll("shortlist");
    const item = shortlist.find(
      (s) => s.userId === userId && s.profileId === profileId,
    );
    if (item) {
      return await jsonDataService.delete("shortlist", item.id);
    }
    return null;
  },

  getShortlist: async (userId) => {
    const shortlist = await jsonDataService.getAll("shortlist");
    return shortlist.filter((s) => s.userId === userId);
  },

  // Block user operations
  blockUser: async (userId, blockedUserId) => {
    const blockItem = {
      userId,
      blockedUserId,
      blockedAt: new Date().toISOString(),
    };
    return await jsonDataService.create("blockedUsers", blockItem);
  },

  unblockUser: async (userId, blockedUserId) => {
    const blocked = await jsonDataService.getAll("blockedUsers");
    const item = blocked.find(
      (b) => b.userId === userId && b.blockedUserId === blockedUserId,
    );
    if (item) {
      return await jsonDataService.delete("blockedUsers", item.id);
    }
    return null;
  },

  getBlockedUsers: async (userId) => {
    const blocked = await jsonDataService.getAll("blockedUsers");
    return blocked.filter((b) => b.userId === userId);
  },

  // Profile view tracking
  trackProfileView: async (userId, profileId) => {
    const view = {
      userId,
      profileId,
      viewedAt: new Date().toISOString(),
    };
    return await jsonDataService.create("profileViews", view);
  },

  getProfileViews: async (userId, date = null) => {
    const views = await jsonDataService.getAll("profileViews");
    let userViews = views.filter((v) => v.userId === userId);

    if (date) {
      const dateStr = new Date(date).toISOString().split("T")[0];
      userViews = userViews.filter((v) => v.viewedAt.startsWith(dateStr));
    }

    return userViews;
  },

  // User activity tracking
  trackActivity: async (userId, activityType, details = {}) => {
    const activity = {
      userId,
      activityType,
      details,
      timestamp: new Date().toISOString(),
    };
    return await jsonDataService.create("userActivity", activity);
  },

  // Event operations
  getEvents: async (filters = {}) => {
    let events = await jsonDataService.getAll("events");

    // Filter by status - only show published events
    events = events.filter((e) => e.status === "published");

    // Apply filters
    if (filters.type) {
      events = events.filter((e) => e.eventType === filters.type);
    }
    if (filters.city) {
      events = events.filter(
        (e) => e.city?.toLowerCase() === filters.city.toLowerCase(),
      );
    }
    if (filters.dateRange) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      events = events.filter((e) => {
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);

        switch (filters.dateRange) {
          case "today":
            return eventDate.getTime() === today.getTime();
          case "week": {
            const weekFromNow = new Date(today);
            weekFromNow.setDate(today.getDate() + 7);
            return eventDate >= today && eventDate <= weekFromNow;
          }
          case "month": {
            const monthFromNow = new Date(today);
            monthFromNow.setMonth(today.getMonth() + 1);
            return eventDate >= today && eventDate <= monthFromNow;
          }
          default:
            return true;
        }
      });
    }
    if (filters.priceRange) {
      events = events.filter((e) => {
        const price = e.price || 0;
        switch (filters.priceRange) {
          case "free":
            return price === 0;
          case "0-500":
            return price > 0 && price <= 500;
          case "500-1000":
            return price > 500 && price <= 1000;
          case "1000+":
            return price > 1000;
          default:
            return true;
        }
      });
    }
    if (filters.ageGroup) {
      events = events.filter((e) => {
        if (!e.ageGroup) return false;
        return e.ageGroup === filters.ageGroup;
      });
    }

    // Sort by date (upcoming first)
    events.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    return events;
  },

  getEventById: async (eventId) => {
    return await jsonDataService.getById("events", eventId);
  },

  registerForEvent: async (userId, eventId) => {
    const registration = {
      userId,
      eventId,
      registrationDate: new Date().toISOString(),
      paymentStatus: "pending",
      attendanceStatus: "registered",
    };

    // Check if already registered
    const registrations = await jsonDataService.getAll("eventRegistrations");
    const existing = registrations.find(
      (r) => r.userId === userId && r.eventId === eventId,
    );

    if (existing) {
      throw new Error("Already registered for this event");
    }

    // Create registration
    const newRegistration = await jsonDataService.create(
      "eventRegistrations",
      registration,
    );

    // Update event participant count
    const event = await jsonDataService.getById("events", eventId);
    if (event) {
      await jsonDataService.update("events", eventId, {
        currentParticipants: (event.currentParticipants || 0) + 1,
      });
    }

    return newRegistration;
  },

  getEventRegistrations: async (eventId) => {
    const registrations = await jsonDataService.getAll("eventRegistrations");
    return registrations.filter((r) => r.eventId === eventId);
  },

  getOrganizerById: async (organizerId) => {
    const organizers = await jsonDataService.getAll("organizers");
    return organizers.find((o) => o.id === organizerId);
  },
};

// Export organizer service methods
export const organizerService = {
  getOrganizerById: async (organizerId) => {
    const organizers = await jsonDataService.getAll("organizers");
    return organizers.find((o) => o.id === organizerId);
  },
};

export default jsonDataService;
