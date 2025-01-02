"use client"

import * as React from "react"
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
const chartData = [
  { date: "2024-04-01", income: 222, expenses: 150 },
  { date: "2024-04-02", income: 97, expenses: 180 },
  { date: "2024-04-03", income: 167, expenses: 120 },
  { date: "2024-04-04", income: 242, expenses: 260 },
  { date: "2024-04-05", income: 373, expenses: 290 },
  { date: "2024-04-06", income: 301, expenses: 340 },
  { date: "2024-04-07", income: 245, expenses: 180 },
  { date: "2024-04-08", income: 409, expenses: 320 },
  { date: "2024-04-09", income: 59, expenses: 110 },
  { date: "2024-04-10", income: 261, expenses: 190 },
  { date: "2024-04-11", income: 327, expenses: 350 },
  { date: "2024-04-12", income: 292, expenses: 210 },
  { date: "2024-04-13", income: 342, expenses: 380 },
  { date: "2024-04-14", income: 137, expenses: 220 },
  { date: "2024-04-15", income: 120, expenses: 170 },
  { date: "2024-04-16", income: 138, expenses: 190 },
  { date: "2024-04-17", income: 446, expenses: 360 },
  { date: "2024-04-18", income: 364, expenses: 410 },
  { date: "2024-04-19", income: 243, expenses: 180 },
  { date: "2024-04-20", income: 89, expenses: 150 },
  { date: "2024-04-21", income: 137, expenses: 200 },
  { date: "2024-04-22", income: 224, expenses: 170 },
  { date: "2024-04-23", income: 138, expenses: 230 },
  { date: "2024-04-24", income: 387, expenses: 290 },
  { date: "2024-04-25", income: 215, expenses: 250 },
  { date: "2024-04-26", income: 75, expenses: 130 },
  { date: "2024-04-27", income: 383, expenses: 420 },
  { date: "2024-04-28", income: 122, expenses: 180 },
  { date: "2024-04-29", income: 315, expenses: 240 },
  { date: "2024-04-30", income: 454, expenses: 380 },
  { date: "2024-05-01", income: 165, expenses: 220 },
  { date: "2024-05-02", income: 293, expenses: 310 },
  { date: "2024-05-03", income: 247, expenses: 190 },
  { date: "2024-05-04", income: 385, expenses: 420 },
  { date: "2024-05-05", income: 481, expenses: 390 },
  { date: "2024-05-06", income: 498, expenses: 520 },
  { date: "2024-05-07", income: 388, expenses: 300 },
  { date: "2024-05-08", income: 149, expenses: 210 },
  { date: "2024-05-09", income: 227, expenses: 180 },
  { date: "2024-05-10", income: 293, expenses: 330 },
  { date: "2024-05-11", income: 335, expenses: 270 },
  { date: "2024-05-12", income: 197, expenses: 240 },
  { date: "2024-05-13", income: 197, expenses: 160 },
  { date: "2024-05-14", income: 448, expenses: 490 },
  { date: "2024-05-15", income: 473, expenses: 380 },
  { date: "2024-05-16", income: 338, expenses: 400 },
  { date: "2024-05-17", income: 499, expenses: 420 },
  { date: "2024-05-18", income: 315, expenses: 350 },
  { date: "2024-05-19", income: 235, expenses: 180 },
  { date: "2024-05-20", income: 177, expenses: 230 },
  { date: "2024-05-21", income: 82, expenses: 140 },
  { date: "2024-05-22", income: 81, expenses: 120 },
  { date: "2024-05-23", income: 252, expenses: 290 },
  { date: "2024-05-24", income: 294, expenses: 220 },
  { date: "2024-05-25", income: 201, expenses: 250 },
  { date: "2024-05-26", income: 213, expenses: 170 },
  { date: "2024-05-27", income: 420, expenses: 460 },
  { date: "2024-05-28", income: 233, expenses: 190 },
  { date: "2024-05-29", income: 78, expenses: 130 },
  { date: "2024-05-30", income: 340, expenses: 280 },
  { date: "2024-05-31", income: 178, expenses: 230 },
  { date: "2024-06-01", income: 178, expenses: 200 },
  { date: "2024-06-02", income: 470, expenses: 410 },
  { date: "2024-06-03", income: 103, expenses: 160 },
  { date: "2024-06-04", income: 439, expenses: 380 },
  { date: "2024-06-05", income: 88, expenses: 140 },
  { date: "2024-06-06", income: 294, expenses: 250 },
  { date: "2024-06-07", income: 323, expenses: 370 },
  { date: "2024-06-08", income: 385, expenses: 320 },
  { date: "2024-06-09", income: 438, expenses: 480 },
  { date: "2024-06-10", income: 155, expenses: 200 },
  { date: "2024-06-11", income: 92, expenses: 150 },
  { date: "2024-06-12", income: 492, expenses: 420 },
  { date: "2024-06-13", income: 81, expenses: 130 },
  { date: "2024-06-14", income: 426, expenses: 380 },
  { date: "2024-06-15", income: 307, expenses: 350 },
  { date: "2024-06-16", income: 371, expenses: 310 },
  { date: "2024-06-17", income: 475, expenses: 520 },
  { date: "2024-06-18", income: 107, expenses: 170 },
  { date: "2024-06-19", income: 341, expenses: 290 },
  { date: "2024-06-20", income: 408, expenses: 450 },
  { date: "2024-06-21", income: 169, expenses: 210 },
  { date: "2024-06-22", income: 317, expenses: 270 },
  { date: "2024-06-23", income: 480, expenses: 530 },
  { date: "2024-06-24", income: 132, expenses: 180 },
  { date: "2024-06-25", income: 141, expenses: 190 },
  { date: "2024-06-26", income: 434, expenses: 380 },
  { date: "2024-06-27", income: 448, expenses: 490 },
  { date: "2024-06-28", income: 149, expenses: 200 },
  { date: "2024-06-29", income: 103, expenses: 160 },
  { date: "2024-06-30", income: 446, expenses: 400 },
]

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

export function VisitorChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("income")

  const total = React.useMemo(
    () => ({
      income: chartData.reduce((acc, curr) => acc + curr.income, 0),
      expenses: chartData.reduce((acc, curr) => acc + curr.expenses, 0),
    }),
    []
  )

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
