"use client";

import { TrendingUp } from "lucide-react";
import { Line, LineChart, XAxis, YAxis } from "recharts";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartCard6Props {
  title?: string;
  description?: string;
  className?: string;
}

const chartData = [
  { month: "Mon", agentRuns: 170, touchless: 108, exceptions: 62 },
  { month: "Tue", agentRuns: 210, touchless: 138, exceptions: 72 },
  { month: "Wed", agentRuns: 240, touchless: 156, exceptions: 84 },
  { month: "Thu", agentRuns: 225, touchless: 148, exceptions: 77 },
  { month: "Fri", agentRuns: 265, touchless: 184, exceptions: 81 },
  { month: "Sat", agentRuns: 250, touchless: 176, exceptions: 74 },
  { month: "Sun", agentRuns: 290, touchless: 212, exceptions: 78 },
];

const chartConfig = {
  agentRuns: {
    label: "Agent runs",
    color: "#4E79A7",
  },
  exceptions: {
    label: "Exceptions",
    color: "#F28E2B",
  },
  touchless: {
    label: "Touchless",
    color: "#E15759",
  },
} satisfies ChartConfig;

const ChartCard6 = ({
  title = "AI agents, permissioned execution",
  description = "Agents reconcile, draft entries, and route approvals within your controls.",
  className,
}: ChartCard6Props) => {
  const totalAgentRuns = chartData.reduce((sum, point) => sum + point.agentRuns, 0);

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
            <CardDescription className="text-muted-foreground max-w-[44ch] text-sm leading-snug">
              {description}
            </CardDescription>
          </div>

          <div className="shrink-0 space-y-2 text-left sm:text-right">
            <div className="text-muted-foreground text-sm leading-snug font-medium uppercase">
              Agent runs
            </div>
            <div className="text-3xl leading-none font-semibold tabular-nums">
              {totalAgentRuns.toLocaleString()}
            </div>
            <div className="text-muted-foreground mt-1 flex items-center justify-center gap-2 text-sm leading-snug font-medium">
              <TrendingUp className="h-4 w-4 text-[#00b389]" />
              <span>+8.2%</span>
              <span className="text-muted-foreground font-medium">vs prev period</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-6">
        <div className="relative h-64 w-full">
          <ChartContainer
            config={chartConfig}
            className="bg-background relative z-10 aspect-auto h-full w-full items-stretch justify-start"
          >
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="month"
                axisLine={{ stroke: "hsl(var(--foreground) / 0.4)", strokeWidth: 1 }}
                tickLine={{ stroke: "hsl(var(--foreground) / 0.4)", strokeWidth: 1 }}
                tickMargin={8}
                fontSize={12}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                width={40}
                axisLine={{ stroke: "hsl(var(--foreground) / 0.4)", strokeWidth: 1 }}
                tickLine={{ stroke: "hsl(var(--foreground) / 0.4)", strokeWidth: 1 }}
                tickMargin={8}
                fontSize={12}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />

              <ChartTooltip content={<ChartTooltipContent />} />

              <Line
                type="monotone"
                dataKey="agentRuns"
                stroke="var(--color-agentRuns)"
                strokeWidth={1.2}
                dot={{ r: 3, fill: "var(--color-agentRuns)" }}
                activeDot={{
                  r: 4,
                  fill: "var(--color-agentRuns)",
                  stroke: "var(--color-agentRuns)",
                }}
              />
              <Line
                type="monotone"
                dataKey="touchless"
                stroke="var(--color-touchless)"
                strokeWidth={1.2}
                dot={{ r: 3, fill: "var(--color-touchless)" }}
                activeDot={{
                  r: 4,
                  fill: "var(--color-touchless)",
                  stroke: "var(--color-touchless)",
                }}
              />
              <Line
                type="monotone"
                dataKey="exceptions"
                stroke="var(--color-exceptions)"
                strokeWidth={1.2}
                dot={{ r: 3, fill: "var(--color-exceptions)" }}
                activeDot={{
                  r: 4,
                  fill: "var(--color-exceptions)",
                  stroke: "var(--color-exceptions)",
                }}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2" style={{ backgroundColor: chartConfig.agentRuns.color }} />
            <span className="text-muted-foreground">Agent runs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2" style={{ backgroundColor: chartConfig.touchless.color }} />
            <span className="text-muted-foreground">Touchless</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2" style={{ backgroundColor: chartConfig.exceptions.color }} />
            <span className="text-muted-foreground">Exceptions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ChartCard6 };
