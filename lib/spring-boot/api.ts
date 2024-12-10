const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface User {
  id?: string; // Optional for creating a new user
  name: string;
  email: string;
}

export interface Income {
  id: string;
  name: number;
  amount: number;
  description: string;
  frequency: string;
  program: string;
}


export const fetchData = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
  }

  return response.json();
};


// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  return fetchData<User[]>("/api/v1/users");
};

// Fetch a single user by ID
export const fetchUserById = async (id: string): Promise<User> => {
  return fetchData<User>(`/api/v1/users/${id}`);
};

// Create a new user
export const createUser = async (user: User): Promise<User> => {
  return fetchData<User>("/api/v1/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

// Update a user
export const updateUser = async (id: string, user: User): Promise<User> => {
  return fetchData<User>(`/api/v1/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
  await fetchData<void>(`/api/v1/users/${id}`, { method: "DELETE" });
};

// Fetch all payments
export const fetchIncomes= async (): Promise<Income[]> => {
  return fetchData<Income[]>("/api/v1/income");
};

// Fetch a single payment by ID
export const fetchIncomeById = async (id: string): Promise<Income> => {
  return fetchData<Income>(`/api/v1/income/${id}`);
};

// Create a new payment
export const createIncome= async (income: Income): Promise<Income> => {
  return fetchData<Income>("/api/v1/income", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(income),
  });
};

// Update a payment
export const updateIncome= async (id: string, income: Income): Promise<Income> => {
  return fetchData<Income>(`/api/v1/income/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(income),
  });
};

// Delete a payment
export const deleteIncome = async (id: string): Promise<void> => {
  await fetchData<void>(`/api/v1/income/${id}`, { method: "DELETE" });
};