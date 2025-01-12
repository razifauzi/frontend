'use client'

import { useState, useEffect } from 'react'
import { StatCard } from '@/components/StatCard'
import { Users, DollarSign, ShoppingCart } from 'lucide-react'
import { fetchIncomes, fetchExpenses, fetchCustomers } from '@/lib/spring-boot/api' // Import the fetch functions

export default function MultipleStatCard() {
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [totalExpenses, setTotalExpenses] = useState<number>(0)
  const [totalCustomer, setTotalCustomer] = useState<number>(0)
  const [incomeChange, setIncomeChange] = useState<number>(0) // Percentage change for income
  const [expensesChange, setExpensesChange] = useState<number>(0) // Percentage change for expenses
  const [customerChange, setCustomerChange] = useState<number>(0) // Percentage change for customers
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Helper function to calculate percentage change
  const calculatePercentageChange = (current: number, previous: number): number => {
    if (previous === 0) return 0; // Avoid division by zero
    return ((current - previous) / previous) * 100;
  }

  // Function to group data by year for incomes
  const groupIncomeByYear = (data: { amount: number, receivedts: string | Date }[]) => {
    const groupedData: Record<number, number> = {};

    data.forEach(item => {
      const year = new Date(item.receivedts).getFullYear();
      if (!groupedData[year]) {
        groupedData[year] = 0;
      }
      groupedData[year] += item.amount;
    });

    return groupedData;
  };

  // Function to group data by year for expenses
  const groupExpensesByYear = (data: { amount: number, issuedts: string | Date }[]) => {
    const groupedData: Record<number, number> = {};

    data.forEach(item => {
      const year = new Date(item.issuedts).getFullYear();
      if (!groupedData[year]) {
        groupedData[year] = 0;
      }
      groupedData[year] += item.amount;
    });

    return groupedData;
  };

  // Function to group customers by the year of creation
  const groupCustomersByYear = (data: Customers[]) => {
    const groupedData: Record<number, number> = {};
  
    data.forEach(item => {
      let createdDate = item.createdts;
  
      // If createdts is undefined or null, skip processing this customer
      if (!createdDate) return;
  
      // If createdts is a Date object
      if (createdDate instanceof Date) {
        if (!isNaN(createdDate.getTime())) {
          const year = createdDate.getFullYear();
          if (!groupedData[year]) {
            groupedData[year] = 0;
          }
          groupedData[year] += 1;
        }
      }
      // If createdts is a string (may have microseconds)
      else if (typeof createdDate === 'string') {
        // Remove microseconds (split the string at the dot if present)
        const dateString = createdDate.split('.')[0]; // Remove microseconds
        createdDate = new Date(dateString); // Convert string to Date object
  
        // Check if it's a valid Date object
        if (!isNaN(createdDate.getTime())) {
          const year = createdDate.getFullYear();
          if (!groupedData[year]) {
            groupedData[year] = 0;
          }
          groupedData[year] += 1;
        }
      }
    });
  
    return groupedData;
  };
  
  
    
  // Fetch data and calculate totals and year-to-year change
  useEffect(() => {
    async function fetchData() {
      try {
        const incomes = await fetchIncomes();
        const expenses = await fetchExpenses();
        const customers = await fetchCustomers(); // Fetch customers

        // Group and sum income and expenses by year
        const groupedIncome = groupIncomeByYear(incomes);
        const groupedExpenses = groupExpensesByYear(expenses);
        const groupedCustomers = groupCustomersByYear(customers);

        // Get the total income and expenses for the current year
        const currentYearIncome = groupedIncome[new Date().getFullYear()] || 0;
        const currentYearExpenses = groupedExpenses[new Date().getFullYear()] || 0;
        const currentYearCustomer = groupedCustomers[new Date().getFullYear()] || 0;

        // Get the total income and expenses for the previous year
        const previousYearIncome = groupedIncome[new Date().getFullYear() - 1] || 0;
        const previousYearExpenses = groupedExpenses[new Date().getFullYear() - 1] || 0;
        const previousYearCustomer = groupedCustomers[new Date().getFullYear() - 1] || 0;

        // Set the totals and calculate the percentage change
        setTotalIncome(currentYearIncome);
        setTotalExpenses(currentYearExpenses);
        setTotalCustomer(currentYearCustomer);
        setIncomeChange(calculatePercentageChange(currentYearIncome, previousYearIncome));
        setExpensesChange(calculatePercentageChange(currentYearExpenses, previousYearExpenses));
        setCustomerChange(calculatePercentageChange(currentYearCustomer, previousYearCustomer));

      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // Format percentage change for description
  const incomeDescription = incomeChange >= 0
    ? `+${incomeChange.toFixed(2)}%  ` 
    : `-${incomeChange.toFixed(2)}%  `;

  const expensesDescription = expensesChange >= 0
    ? `+${expensesChange.toFixed(2)}%  `
    : `-${expensesChange.toFixed(2)}%  `;

  const customerDescription = customerChange >= 0
    ? `+${customerChange.toFixed(2)}%  `
    : `-${customerChange.toFixed(2)}%  `;

  // Dynamically apply color class (green for increase, red for decrease)
  const incomeChangeColor = incomeChange >= 0 ? 'font-bold text-green-500' : 'font-bold text-red-500';
  const expensesChangeColor = expensesChange >= 0 ? 'font-bold text-green-500' : 'font-bold text-red-500';
  const customerChangeColor = customerChange >= 0 ? 'font-bold text-green-500' : 'font-bold text-red-500';

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <StatCard
        title="Total Income"
        value={`RM ${totalIncome.toLocaleString()}`} // Display the total income
        icon={DollarSign}
        description={
          <>
            <span className={incomeChangeColor}>{incomeDescription}</span> from last year
          </>
        }
      />
      <StatCard
        title="Total Expenses"
        value={`RM ${totalExpenses.toLocaleString()}`} // Display the total expenses
        icon={ShoppingCart}
        description={
          <>
            <span className={expensesChangeColor}>{expensesDescription}</span> from last year
          </>
        }
      />
      <StatCard
        title="Active Customers"
        value={totalCustomer.toLocaleString()} // Display the total number of customers
        icon={Users}
        description={
          <>
            <span className={customerChangeColor}>{customerDescription}</span> from last year
          </>
        }
      />
    </div>
  );
}
