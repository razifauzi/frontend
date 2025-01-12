"use client"

import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { fetchIncomes, fetchExpenses } from "@/lib/spring-boot/api"


const chartConfig = {
  views: {
    label: "Amount : RM",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DualLineChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("income")
  const [total, setTotal] = useState({ income: 0, expenses: 0 });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomes, expenses] = await Promise.all([fetchIncomes(), fetchExpenses()]);
    
        // Define the type
        type IncomeExpenseMap = {
          [key: string]: { income: number; expenses: number };
        };
    
        // Create income map
        const incomeMap = incomes.reduce<IncomeExpenseMap>((map, income) => {
          const date = income.receivedts.toISOString().split("T")[0];
          map[date] = { income: income.amount, expenses: 0 };
          return map;
        }, {});
    
        // Create expense map
        const expenseMap = expenses.reduce<IncomeExpenseMap>((map, expense) => {
          const date = expense.issuedts.toISOString().split("T")[0];
          if (!map[date]) map[date] = { income: 0, expenses: 0 };
          map[date].expenses = expense.amount;
          return map;
        }, incomeMap);
    
        // Combine data
        const combinedData = Object.keys(expenseMap).map((date) => ({
          date,
          ...expenseMap[date],
        }));
    
        setChartData(combinedData);
    
        const totalIncome = combinedData.reduce((acc, curr) => acc + curr.income, 0);
        const totalExpenses = combinedData.reduce((acc, curr) => acc + curr.expenses, 0);
    
        setTotal({ income: totalIncome, expenses: totalExpenses });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["income", "expenses"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
