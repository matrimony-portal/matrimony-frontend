const API_BASE_URL = "http://localhost:8080";

export const fetchAdminProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch admin profile");
    }

    const data = await response.json();
    console.log("Admin profile data:", data);

    const firstName = data.firstName || data.first_name || data.name || "Admin";
    const lastName = data.lastName || data.last_name || "";

    return {
      name: `${firstName} ${lastName}`.trim(),
      avatar: data.avatar || "https://i.pravatar.cc/40",
      ...data,
    };
  } catch (error) {
    console.error("Admin profile fetch error:", error);
    return {
      name: "Admin User",
      avatar: "https://i.pravatar.cc/40",
    };
  }
};
