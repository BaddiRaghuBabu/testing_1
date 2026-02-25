"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartCard26Props {
  title?: string;
  description?: string;
  target?: number;
  upperBound?: number;
  lowerBound?: number;
  className?: string;
}

const chartData = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: 273 },
  { month: "May", value: 209 },
  { month: "Jun", value: 314 },
  { month: "Jul", value: 286 },
  { month: "Aug", value: 320 },
  { month: "Sep", value: 298 },
  { month: "Oct", value: 342 },
];

const chartConfig = {
  value: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const ChartCard26 = ({
  title = "Revenue with Target Band",
  description = "(USD M)",
  target = 280,
  upperBound = 320,
  lowerBound = 240,
  className,
}: ChartCard26Props) => {
  const totalRevenue = chartData.reduce((sum, point) => sum + point.value, 0);

  return (
    <Card
      className={cn(
        "border-border/60 bg-background flex w-full max-w-2xl flex-col gap-0 rounded-lg border p-0 py-0 shadow-none",
        className,
      )}
    >
      <CardHeader className="gap-0 p-6 pb-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1 space-y-2">
            <CardTitle className="text-base leading-none font-medium">{title}</CardTitle>
            <CardDescription className="text-muted-foreground max-w-[44ch] text-base leading-none font-medium tracking-wide">
              {description}
            </CardDescription>
          </div>

          <div className="shrink-0 space-y-2 text-left sm:text-right">
            <div className="text-muted-foreground text-sm leading-snug font-medium uppercase">
              Revenue (USD M)
            </div>
            <div className="text-3xl leading-none font-semibold tabular-nums">
              {totalRevenue.toLocaleString()}
            </div>
            <div className="text-muted-foreground mt-1 flex items-center justify-center gap-2 text-sm leading-snug font-medium">
              <TrendingUp className="h-4 w-4 text-[#00b389]" />
              <span>+6.4%</span>
              <span className="text-muted-foreground font-medium">vs prev period</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-6">
        <ChartContainer
          config={chartConfig}
          className="bg-background relative z-10 h-64 w-full items-stretch justify-start"
        >
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient26" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E15759" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#E15759" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={8} fontSize={12} />
            <YAxis
              width={40}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              fontSize={12}
              domain={[150, 400]}
            />

            <ReferenceArea
              y1={lowerBound}
              y2={upperBound}
              fill="var(--chart-2)"
              fillOpacity={0.1}
            />

            <ReferenceLine
              y={target}
              stroke="var(--chart-2)"
              strokeDasharray="4 4"
              strokeWidth={2}
            />

            <ReferenceLine
              y={upperBound}
              stroke="var(--chart-2)"
              strokeOpacity={0.4}
              strokeWidth={1}
            />

            <ReferenceLine
              y={lowerBound}
              stroke="var(--chart-2)"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#E15759"
              strokeWidth={1.2}
              fill="url(#chartGradient26)"
            />
          </AreaChart>
        </ChartContainer>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-chart-1 h-0.5 w-4" />
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="border-chart-2 h-0.5 w-4 border-t-2 border-dashed" />
            <span className="text-muted-foreground">Target ({target})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-chart-2 h-3 w-4 rounded-sm opacity-20" />
            <span className="text-muted-foreground">
              Range ({lowerBound}-{upperBound})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ChartCard26 };
