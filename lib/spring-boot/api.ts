const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface User {
  id?: string; // Optional for creating a new user
  name: string;
  email: string;
}

export interface Income {
  id: string;
  name: string;
  amount: string;
  description: string;
  frequency: string;
  program: string;
  fileName: string,
}


export const fetchData = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
  }

  return response.json();
};


// Fetch all income
export const fetchIncomes= async (): Promise<Income[]> => {
  return fetchData<Income[]>("/api/v1/income");
};

// Fetch a single income by ID
export const fetchIncomeById = async (id: string): Promise<Income> => {
  return fetchData<Income>(`/api/v1/income/${id}`);
};

// Create a new income
export const createIncome= async (income: Income): Promise<Income> => {
  return fetchData<Income>("/api/v1/income", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(income),
  });
};

// Update a income
export const updateIncome= async (id: string, income: Income): Promise<Income> => {
  return fetchData<Income>(`/api/v1/income/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(income),
  });
};

// Delete a income
export const deleteIncome = async (id: string): Promise<void> => {
  await fetchData<void>(`/api/v1/income/${id}`, { method: "DELETE" });
};
