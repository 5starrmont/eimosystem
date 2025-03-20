
import * as React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors: string[];
  valueFormatter?: (value: number) => string;
  customTooltip?: boolean;
}

export const BarChart = ({
  data,
  index,
  categories,
  colors,
  valueFormatter = (value: number) => `${value}`,
  customTooltip = false,
}: BarChartProps) => {
  const config = categories.reduce(
    (acc, category, i) => ({
      ...acc,
      [category]: {
        label: category.charAt(0).toUpperCase() + category.slice(1),
        color: colors[i % colors.length],
      },
    }),
    {}
  );

  return (
    <ChartContainer config={config}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={index} />
        <YAxis />
        <Tooltip
          content={
            customTooltip
              ? (props) => (
                  <ChartTooltipContent
                    {...props as TooltipProps<any, any>}
                    formatter={(value, name) => [
                      valueFormatter(value as number),
                      name as string,
                    ]}
                  />
                )
              : undefined
          }
        />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};
