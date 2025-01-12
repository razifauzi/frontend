"use client"

import { useState, useEffect } from 'react'
import { DynamicPieChart } from '@/components/charts/PieCharts/DynamicPieChart'
import { fetchExpenses } from '@/lib/spring-boot/api'
import { expensesOptions} from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function ExpensesChartPage() {
  const [data, setData] = useState<{ key: string, value: number }[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const expensesData = await fetchExpenses()

        // Grouping and summing data by 'category'
        const groupedData = expensesData.reduce((acc: Record<string, number>, item) => {
          const category = item.category // Group by category

          if (!acc[category]) {
            acc[category] = 0
          }

          // Sum the amount for the same category
          acc[category] += item.amount

          return acc
        }, {})

        // Flatten grouped data into a format suitable for the chart
        const aggregatedData = Object.entries(groupedData).map(([key, value]) => ({
          key,
          value,
        }))

        setData(aggregatedData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'))
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Expenses Distribution</h1>
        <Skeleton className="w-full h-[400px]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Expenses Distribution</h1>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!data) {
    return null
  }

  // Adjust data to match the structure expected by DynamicPieChart
  const chartData = data.map(item => ({
    key: item.key,
    value: item.value,
  }))

  return (
    <div className="container mx-auto p-4">
      <DynamicPieChart
        data={chartData} // Pass the adjusted chart data
        options={expensesOptions} // Pass incomeOptions as category labels
        title="Expenses Distribution"
        description="Distribution of expenses sources"
        valueKey="MYR"
        trend={{
          value: 5.5,
          isUp: true,
        }}
        trendDescription="Showing total exepenses for the last month"
      />
    </div>
  )
}
