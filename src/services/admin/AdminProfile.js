export const getAdminById = async (id) => {
  const response = await fetch(`http://localhost:8080/admins/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch admin data");
  }

  return response.json();
};
