const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || "https://cmssolution.com.my";




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


// Fetch all expenses
export const fetchExpenses= async (): Promise<Expenses[]> => {
  return fetchData<Expenses[]>("/api/v1/expenses");
};

// Fetch a single Expenses by ID
export const fetchExpensesById = async (id: string): Promise<Expenses> => {
  return fetchData<Expenses>(`/api/v1/expenses/${id}`);
};

// Create a new Expenses
export const createExpenses= async (expenses: Expenses): Promise<Expenses> => {
  return fetchData<Expenses>("/api/v1/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expenses),
  });
};

// Update a Expenses
export const updateExpenses= async (id: string, expenses: Expenses): Promise<Expenses> => {
  return fetchData<Expenses>(`/api/v1/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expenses),
  });
};

// Delete a Expenses
export const deleteExpenses = async (id: string): Promise<void> => {
  await fetchData<void>(`/api/v1/expenses/${id}`, { method: "DELETE" });
};


// Fetch all customer
export const fetchCustomers= async (): Promise<Customers[]> => {
  return fetchData<Customers[]>("/api/v1/customer");
};

// Fetch a single Customer by ID
export const fetchCustomerById = async (id: string): Promise<Customers> => {
  return fetchData<Customers>(`/api/v1/customer/${id}`);
};

// Create a new Customer
export const createCustomer= async (customers: Customers): Promise<Customers> => {
  return fetchData<Customers>("/api/v1/customer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customers),
  });
};

// Update a Customer
export const updateCustomer= async (id: string, customers: Customers): Promise<Customers> => {
  return fetchData<Customers>(`/api/v1/customer/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customers),
  });
};

// Delete a Customer
export const deleteCustomer = async (id: string): Promise<void> => {
  await fetchData<void>(`/api/v1/customer/${id}`, { method: "DELETE" });
};

// Fetch all Vendor
export const fetchVendors= async (): Promise<Vendors[]> => {
  return fetchData<Vendors[]>("/api/v1/vendor");
};

// Fetch a single Vendor by ID
export const fetchVendorById = async (id: string): Promise<Vendors> => {
  return fetchData<Vendors>(`/api/v1/vendor/${id}`);
};

// Create a new Vendor
export const createVendor= async (vendor: Vendors): Promise<Vendors> => {
  return fetchData<Vendors>("/api/v1/vendor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vendor),
  });
};

// Update a Vendor
export const updateVendor= async (id: string, vendor: Vendors): Promise<Vendors> => {
  return fetchData<Vendors>(`/api/v1/vendor/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vendor),
  });
};

// Delete a Vendor
export const deleteVendor = async (id: string): Promise<void> => {
  await fetchData<void>(`/api/v1/vendor/${id}`, { method: "DELETE" });
};