const API_URL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/users";

export interface User {
  id?: string; // Optional for creating a new user
  name: string;
  email: string;
}

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// Fetch a user by ID
export const fetchUserById = async (id: string): Promise<User> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

// Create a new user
export const createUser = async (user: User): Promise<User> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
};

// Update an existing user
export const updateUser = async (id: string, user: User): Promise<User> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

// Delete a user by ID
export const deleteUser = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
};
