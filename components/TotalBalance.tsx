'use client'

import React, { useEffect, useState } from 'react'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'
import { fetchIncomes, fetchExpenses } from '@/lib/spring-boot/api' // Import the fetch functions

const TotalBalance = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);

  useEffect(() => {
    // Fetch income and expenses data
    const fetchData = async () => {
      try {
        const incomeData = await fetchIncomes();
        const expensesData = await fetchExpenses();

        // Calculate total income and total expenses
        const totalIncome = incomeData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
        const totalExpenses = expensesData.reduce((sum, item) => sum + parseFloat(item.amount), 0);

        // Update state with total income and expenses
        setIncome(totalIncome);
        setExpenses(totalExpenses);
      } catch (error) {
        console.error('Error fetching income and expenses:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate total balance (income - expenses)
  const totalBalance = income - expenses;

  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart income={income} expenses={expenses} />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Income</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={income} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Expenses</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={expenses} />
          </div>
        </div>
        {/* <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Balance</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalBalance} />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TotalBalance;
