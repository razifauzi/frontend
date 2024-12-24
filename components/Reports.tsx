"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { fetchIncomes, fetchExpenses } from "@/lib/spring-boot/api"

const chartConfig: ChartConfig = {
    incomes: {
      label: "Incomes",
      color: "#2563eb",
    },
    expenses: {
      label: "Expenses",
      color: "#60a5fa",
    },
  };
  
  // Fixed array of months
  const fixedMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const Reports = () => {
    const [chartData, setChartData] = useState<
      { month: string; incomes: number; expenses: number }[]
    >([]);
    
    const [totalIncomes, setTotalIncomes] = useState<number>(0);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const incomes = await fetchIncomes();
          const expenses = await fetchExpenses();
  
          // Initialize chart data with fixed months
          const initialChartData = fixedMonths.map((month, index) => ({
            month,
            incomes: 0,
            expenses: 0,
          }));
  
          let totalIncomesAmount = 0;
          let totalExpensesAmount = 0;
  
          // Aggregate incomes and expenses by month
          incomes.forEach((income) => {
            const incomeMonth = new Date(income.frequency).getMonth();
            initialChartData[incomeMonth].incomes += parseFloat(income.amount) || 0;
            totalIncomesAmount += parseFloat(income.amount) || 0;
          });
  
          expenses.forEach((expense) => {
            const expenseMonth = new Date(expense.frequency).getMonth();
            initialChartData[expenseMonth].expenses += parseFloat(expense.amount) || 0;
            totalExpensesAmount += parseFloat(expense.amount) || 0;
          });
  
          setChartData(initialChartData);
          setTotalIncomes(totalIncomesAmount);
          setTotalExpenses(totalExpensesAmount);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const pieData = [
      { name: "Incomes", value: totalIncomes },
      { name: "Expenses", value: totalExpenses },
    ];
  
    return (
      <div>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="incomes" fill={chartConfig.incomes.color} radius={4} />
            <Bar dataKey="expenses" fill={chartConfig.expenses.color} radius={4} />
          </BarChart>
        </ChartContainer>
  
        <div className="mt-8">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? chartConfig.incomes.color : chartConfig.expenses.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    );
  };
export default Reports;
