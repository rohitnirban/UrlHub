"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  views: {
    label: "Clicks",
  },
  total: {
    label: "Total",
    color: "#000be2",
  },
} satisfies ChartConfig;

interface EngagementChartProps {
  clickDetails: {
    country: string;
    city: string;
    device: string;
    browser: string;
    os: string;
    referrer: string;
    timestamp: string;
    _id: string;
  }[];
}

export function EngagementChart({ clickDetails }: EngagementChartProps) {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>(
    "total"
  );

  // Helper function to generate previous 9 dates
  const generatePreviousDates = (numDays: number) => {
    const dates: string[] = [];
    const today = new Date();

    for (let i = 0; i < numDays; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }

    return dates.reverse();
  };

  const chartData = React.useMemo(() => {
    const dateCounts: Record<string, number> = {};

    // Aggregate clicks by date
    clickDetails.forEach((click) => {
      const date = new Date(click.timestamp).toISOString().split("T")[0]; // Extract date
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    // Generate the previous 9 dates including today
    const previousDates = generatePreviousDates(9);

    // Fill in the missing dates with 0 clicks
    return previousDates.map((date) => ({
      date,
      total: dateCounts[date] || 0,
    }));
  }, [clickDetails]);

  const totalClicks = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.total, 0),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Clicks</CardTitle>
          <CardDescription>
            Showing total clicks of last 10 Days
          </CardDescription>
        </div>
        <div className="flex">
          {["total"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {totalClicks.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
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
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
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
                    });
                  }}
                />
              }
            />
            <Bar dataKey="total" fill={`var(--color-total)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
