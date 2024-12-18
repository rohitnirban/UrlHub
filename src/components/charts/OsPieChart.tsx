"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface OsPieChartProps {
  clickDetails: { os: string; _id: string }[];
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  linux: {
    label: "Chrome",
    color: "#000dff",
  },
  windows: {
    label: "Safari",
    color: "#010bcd",
  },
  macOs: {
    label: "Firefox",
    color: "#0009ab",
  },
  android: {
    label: "Edge",
    color: "#626aff",
  },
  other: {
    label: "Other",
    color: "#1f2aff",
  },
} satisfies ChartConfig

export function OsPieChart({ clickDetails }: OsPieChartProps) {
  // Process data to calculate visitors by OS
  const chartData = React.useMemo(() => {
    const osCounts: Record<string, number> = {};

    clickDetails.forEach((click) => {
      osCounts[click.os] = (osCounts[click.os] || 0) + 1;
    });

    return Object.entries(osCounts).map(([os, visitors]) => ({
      os,
      visitors,
      fill: `var(--color-${os.toLowerCase()})` || "#cccccc", // Fallback color
    }));
  }, [clickDetails]);

  // Calculate total visitors
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>OS Usage</CardTitle>
        <CardDescription>Operating system distribution for visitors</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="os"
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
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total visitors categorized by operating system
        </div>
      </CardFooter>
    </Card>
  );
}
