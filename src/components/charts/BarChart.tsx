
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

// Create a custom tooltip component with explicit typings
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }
  
  return (
    <ChartTooltipContent
      active={active}
      payload={payload}
      label={label}
      formatter={formatter}
    />
  );
};

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

  // Custom formatter function for the tooltip
  const formatter = (value: number, name: string) => {
    return [valueFormatter(value), name];
  };

  return (
    <ChartContainer config={config}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={index} />
        <YAxis />
        {customTooltip ? (
          <Tooltip content={(props) => <CustomTooltip {...props} formatter={formatter} />} />
        ) : (
          <Tooltip />
        )}
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
