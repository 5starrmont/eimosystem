
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

  // Define a tooltip content renderer that is type-compatible with recharts
  const renderTooltipContent = React.useCallback(
    (props: any) => {
      if (!props.active || !props.payload) {
        return null;
      }
      
      return (
        <ChartTooltipContent
          {...props}
          formatter={(value: any, name: any) => [
            valueFormatter(value as number),
            name as string,
          ]}
        />
      );
    },
    [valueFormatter]
  );

  return (
    <ChartContainer config={config}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={index} />
        <YAxis />
        {customTooltip ? (
          <Tooltip content={renderTooltipContent} />
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
