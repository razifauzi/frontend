"use client"

import * as React from "react"
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CustomLegend } from "./CustomeLegend"
import { generateColors } from "@/lib/utils"

// Generalized type for data items
export type DataItem = {
  key: string;
  value: number;
}

// Generalized type for options that map data items to labels
export type DataOption = {
  key: string;
  label: string;
}

export type DynamicPieChartProps = {
  data: DataItem[];
  options: DataOption[];
  title: string;
  description: string;
  valueKey: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  trendDescription?: string;
}

export function DynamicPieChart({
  data = [],
  options = [],
  title,
  description,
  valueKey,
  trend,
  trendDescription
}: DynamicPieChartProps) {
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0)
  }, [data])

  const colors = React.useMemo(() => {
    const generatedColors = generateColors(options.length);
    console.log(generatedColors);  // Add this to check the colors generated
    return generatedColors;
  }, [options.length])

  const chartData = React.useMemo(() => {
    return data.map((item, index) => {
      const option = options.find(opt => opt.key === item.key)
      return {
        ...item,
        label: option ? option.label : item.key,
        fill: colors[index % colors.length],
        percentage: (item.value / totalValue) * 100
      }
    })
  }, [data, options, totalValue, colors])

  const chartConfig = React.useMemo(() => {
    const config = chartData.reduce((acc, item) => {
      acc[item.key] = {
        label: item.label,
        color: item.fill,
      }
      return acc
    }, {} as Record<string, { label: string; color: string }>)

    config[valueKey] = { label: valueKey, color: 'hsl(var(--chart-0))' }
    return config
  }, [chartData, valueKey])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
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
                            {totalValue.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {valueKey}
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <CustomLegend data={chartData} />
      </CardContent>
      {/* {trend && (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            {trend.isUp ? 'Trending up' : 'Trending down'} by {trend.value}% this month
            {trend.isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          </div>
          {trendDescription && (
            <div className="leading-none text-muted-foreground">
              {trendDescription}
            </div>
          )}
        </CardFooter>
      )} */}
    </Card>
  )
}
