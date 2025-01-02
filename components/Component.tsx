"use client"

import * as React from "react"
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from "recharts"
import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartData: BrowserData[] = [
  { browser: "chrome", visitors: 275, fill: "hsl(var(--chart-1))", percentage: 0 },
  { browser: "safari", visitors: 200, fill: "hsl(var(--chart-2))", percentage: 0 },
  { browser: "firefox", visitors: 287, fill: "hsl(var(--chart-3))", percentage: 0 },
  { browser: "edge", visitors: 173, fill: "hsl(var(--chart-4))", percentage: 0 },
  { browser: "other", visitors: 190, fill: "hsl(var(--chart-5))", percentage: 0 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

const CustomLegend = ({ data }: { data: BrowserData[] }) => (
    <div className="flex flex-col gap-2 text-sm mt-6">
      {data.map((entry) => (
        <div key={entry.browser} className="flex items-center gap-2">
          <div style={{ backgroundColor: entry.fill }} className="h-3 w-3 rounded-full" />
          <span className="capitalize">{entry.browser}</span>
          <span className=" ml-auto font-medium">{entry.percentage.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  )

export function Component() {
  const [data, setData] = React.useState<BrowserData[]>(chartData)

  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [data])

  React.useEffect(() => {
    const updatedData = data.map(item => ({
      ...item,
      percentage: (item.visitors / totalVisitors) * 100,
    }))
    setData(updatedData)
  }, [totalVisitors])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Browser Usage</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <CustomLegend data={data}/>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
