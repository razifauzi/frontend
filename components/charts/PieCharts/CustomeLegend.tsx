type LegendItem = {
  key: string;
  label: string;
  value: number;
  fill: string;
  percentage: number;
}

type CustomLegendProps = {
  data: LegendItem[];
}

export function CustomLegend({ data }: CustomLegendProps) {
  return (
    <div className="flex flex-col gap-2 text-sm mt-4">
      {data.map((entry) => (
        <div key={entry.key} className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.fill }} />
          <span className="capitalize">{entry.label}</span>
          <span className="ml-auto font-medium">{entry.percentage.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  )
}