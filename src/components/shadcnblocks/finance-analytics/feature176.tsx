"use client";

import {
  ArrowUp,
  ArrowUpRight,
  BarChart as BarChartIcon,
  ChartCandlestick,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { RadialBar, RadialBarChart } from "recharts";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

/* ───────────────── Feature176 chart (bar) ───────────────── */

const monthlyChartData = [
  { month: "Jan '24", desktop: 40, mobile: 30 },
  { month: "Feb '24", desktop: 60, mobile: 30 },
  { month: "Mar '24", desktop: 70, mobile: 35 },
  { month: "Apr '24", desktop: 50, mobile: 25 },
  { month: "May '24", desktop: 40, mobile: 20 },
  { month: "Jun '24", desktop: 30, mobile: 15 },
  { month: "Jul '24", desktop: 70, mobile: 35 },
  { month: "Aug '24", desktop: 50, mobile: 25 },
  { month: "Sep '24", desktop: 40, mobile: 20 },
  { month: "Oct '24", desktop: 30, mobile: 15 },
  { month: "Nov '24", desktop: 45, mobile: 22 },
  { month: "Dec '24", desktop: 55, mobile: 28 },
];

const monthlyChartConfig = {
  desktop: { label: "Net Revenue" },
  mobile: { label: "OpEx" },
} satisfies ChartConfig;

/* ───────────────── Left Card (radial) — SPACING FIXED ───────────────── */

type StatItem = {
  value: string;
  unit?: string;
  lines: [string, string?];
};

const statsData: StatItem[] = [
  { value: "1.8×", lines: ["Current ratio", "Latest"] },
  { value: "7.2", unit: "mo", lines: ["Cash runway", "At burn"] },
  { value: "$0.4M", lines: ["Free cash flow", "L6M avg"] },
];

interface Stats17Props {
  className?: string;
}

/**
 * 5 rings: Current assets / liquidity composition
 */
const radialChartData = [
  { segment: "cash", visitors: 275, fill: "var(--color-cash)" },
  { segment: "ar", visitors: 200, fill: "var(--color-ar)" },
  { segment: "stinv", visitors: 187, fill: "var(--color-stinv)" },
  { segment: "prepaids", visitors: 173, fill: "var(--color-prepaids)" },
  { segment: "otherca", visitors: 90, fill: "var(--color-otherca)" },
];

const radialChartConfig = {
  visitors: { label: "Mix" },
  cash: { label: "Cash & Eq", color: "#8EC5FD" },
  ar: { label: "A/R", color: "#2B7FFC" },
  stinv: { label: "ST Inv", color: "#165DFC" },
  prepaids: { label: "Prepaids", color: "#1448E6" },
  otherca: { label: "Other CA", color: "#193CB9" },
} satisfies ChartConfig;

/* ───────────────── Radial hero chart ───────────────── */

const ChartRadialSimple = () => {
  return (
    <div className="relative flex w-fit justify-center overflow-visible p-0">
      <ChartContainer
        config={radialChartConfig}
        className={cn(
          "overflow-visible",
          // keep chart scale stable and predictable vs the KPI rail
          "h-[290px] w-[290px]",
          "sm:h-[330px] sm:w-[330px]",
          "xl:h-[352px] xl:w-[352px]",
          "2xl:h-[382px] 2xl:w-[382px]",
        )}
      >
        <RadialBarChart
          data={radialChartData}
          startAngle={120}
          endAngle={-240}
          innerRadius="40%"
          outerRadius="100%"
          barSize={14}
          margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="segment" />}
          />
          <RadialBar
            dataKey="visitors"
            cornerRadius={999}
            background={{ fill: "hsl(var(--muted) / 0.25)" }}
          />
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
};

const KpiRailItem = ({ stat }: { stat: StatItem }) => {
  return (
    <div className="flex flex-col items-center text-center xl:items-start xl:text-left">
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold tracking-tight tabular-nums">{stat.value}</span>
        {stat.unit ? (
          <span className="text-foreground text-xl font-bold tabular-nums">{stat.unit}</span>
        ) : null}
      </div>

      <div className="text-muted-foreground mt-2 text-sm leading-snug">
        <div>{stat.lines[0]}</div>
        {stat.lines[1] ? <div>{stat.lines[1]}</div> : null}
      </div>
    </div>
  );
};

const Stats17 = ({ className }: Stats17Props) => {
  return (
    <section className={cn("w-full overflow-visible", className)}>
      {/* ✅ KEY FIX:
          Wrap the whole “module” in a w-fit container and center it.
          This removes uneven left/right gutters caused by a 1fr grid column. */}
      <div className="mx-auto w-full max-w-full xl:w-fit">
        {/* Header — aligned to the module’s left edge */}
        <div className="flex items-center justify-center gap-4">
          <Clock className="text-foreground size-5" />
          <div className="text-base leading-none font-medium">Liquidity — Current Assets Mix</div>
        </div>

        {/* Body — fixed columns at md/lg so the module width is deterministic */}
        <div
          className={cn(
            "mt-4 grid w-full max-w-full grid-cols-1 gap-8",
            "xl:w-fit xl:grid-cols-[380px_240px] xl:items-center xl:gap-x-14",
            "2xl:grid-cols-[410px_240px]",
          )}
        >
          {/* LEFT: donut + delta (both centered under the donut) */}
          <div className="flex w-full flex-col items-center">
            <ChartRadialSimple />

            <div className="text-muted-foreground mt-1 flex items-center justify-center gap-2 text-sm leading-snug">
              <span>Net cash +6% MoM</span>
              <TrendingUp className="h-4 w-4 text-[#00b389]" />
            </div>
          </div>

          {/* RIGHT: KPI rail — vertically centered against the donut */}
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-60 flex-col justify-center gap-10">
              {statsData.map((stat) => (
                <KpiRailItem key={`${stat.value}-${stat.lines[0]}`} stat={stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────── Feature176 component ───────────────── */

interface Feature176Props {
  className?: string;
}

const Feature176 = ({ className }: Feature176Props) => {
  return (
    <section className={cn("relative pt-20 pb-0 md:pt-24 lg:pt-28", className)}>
      <div className="absolute inset-0">
        <div className="bg-background absolute inset-0 bg-size-[16px_16px] opacity-20" />
        <div className="bg-background absolute inset-0" />
        <div className="bg-background absolute inset-0 mask-[radial-gradient(circle_at_center,transparent_50%,hsl(var(--background))_100%)] bg-size-[32px_32px] opacity-20" />
      </div>

      <div className="relative z-10 container">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:items-stretch">
          {/* Left Side */}
          <div className="bg-background flex min-w-0 flex-col rounded-lg md:h-full">
            {/* keep your outer padding; the inner module is now centered precisely */}
            <div className="bg-background border-border/60 h-full rounded-lg border p-6 shadow-none">
              <Stats17 />
            </div>
          </div>

          {/* Right Side (unchanged) */}
          <div className="min-w-0 md:h-full">
            <div className="bg-background flex h-full flex-col gap-2 rounded-lg">
              <Card className="border-border/60 bg-background shadow-none">
                <CardHeader className="flex flex-row items-center">
                  <div className="flex items-center gap-4">
                    <BarChartIcon className="text-foreground size-5" />
                    <CardTitle className="text-base leading-none font-medium">
                      P&amp;L Trend - Net Revenue vs OpEx
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <ChartContainer config={monthlyChartConfig} className="h-[196px] w-full">
                    <BarChart accessibilityLayer data={monthlyChartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                      />
                      <Bar dataKey="desktop" radius={4} fill="#0A2540" />
                      <Bar dataKey="mobile" radius={4} fill="#A8B0BA" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="bg-background border-border/60 flex flex-col rounded-lg border p-4 shadow-none md:flex-1">
                <div className="flex flex-row items-center">
                  <ChartCandlestick className="text-foreground size-6" />
                  <span className="ml-4 text-base leading-none font-medium">Finance Ops KPIs</span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="bg-background border-border/60 rounded-lg border p-4 shadow-none">
                    <div className="flex items-start justify-between">
                      <h2 className="text-3xl font-bold tabular-nums">2.5K</h2>
                      <ArrowUpRight className="size-6 text-[#00b389]" />
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm leading-snug">
                      AP Invoices Processed
                    </p>
                  </div>

                  <div className="bg-background border-border/60 rounded-lg border p-4 shadow-none">
                    <div className="flex items-start justify-between">
                      <h2 className="text-3xl font-bold tabular-nums">$8.1K</h2>
                      <ArrowUpRight className="size-6 text-[#00b389]" />
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm leading-snug">Net Revenue</p>
                  </div>

                  <div className="bg-background border-border/60 rounded-lg border p-4 shadow-none">
                    <div className="flex items-start justify-between">
                      <h2 className="text-3xl font-bold tabular-nums">92%</h2>
                      <ArrowUp className="size-6 text-[#00b389]" />
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm leading-snug">
                      Forecast Accuracy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Right Side */}
        </div>
      </div>
    </section>
  );
};

export { Feature176 };
