const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function convertDates(income: any): Income {
  return {
    ...income,
    startDate: new Date(income.startDate),
    endDate: income.endDate ? new Date(income.endDate) : undefined,
    receivedts: new Date(income.receivedts),
    issuedts: new Date(income.issuedts),
  }
}

function converExepnsestDates(expenses: any): Expenses {
  return {
    ...expenses,
    issuedts: new Date(expenses.issuedts),
  }
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
export async function fetchIncomes(): Promise<Income[]> {
  try {
    const incomes = await fetchData<Income[]>('/api/v1/income');
    return incomes.map(convertDates);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    throw new Error('Failed to fetch incomes');
  }
}

// Fetch a single income by ID
export async function fetchIncomeById(id: string): Promise<Income> {
  const income = await fetchData<Income>(`/api/v1/income/${id}`);
  return convertDates(income);
}

// Create a new income
export async function createIncome(income: Omit<Income, 'id'>): Promise<Income> {
  const newIncome = await fetchData<Income>('/api/v1/income', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...income,
      receivedts: income.receivedts.toISOString(),
    }),
  });
  return convertDates(newIncome);
}

// Update a income
export async function updateIncome(id: string, income: Partial<Income>): Promise<Income> {
  const updatedIncome = await fetchData<Income>(`/api/v1/income/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...income,
      receivedts: income.receivedts?.toISOString(),
    }),
  });
  return convertDates(updatedIncome);
}

// Delete a income
export async function deleteIncome(id: string): Promise<void> {
  await fetchData<void>(`/api/v1/income/${id}`, {
    method: 'DELETE',
  });
}

// Fetch all expenses
export const fetchExpenses= async (): Promise<Expenses[]> => {
  return fetchData<Expenses[]>("/api/v1/expenses");
};

// Fetch a single Expenses by ID
export async function fetchExpensesById(id: string): Promise<Expenses> {
  const expenses = await fetchData<Expenses>(`/api/v1/expenses/${id}`);
  return converExepnsestDates(expenses);
}


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