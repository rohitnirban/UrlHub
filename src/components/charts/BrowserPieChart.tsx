"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Legend } from "recharts";

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

interface BrowserPieChartProps {
  clickDetails: { browser: string; _id: string }[];
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#000dff",
  },
  safari: {
    label: "Safari",
    color: "#010bcd",
  },
  firefox: {
    label: "Firefox",
    color: "#0009ab",
  },
  edge: {
    label: "Edge",
    color: "#626aff",
  },
  opera: {
    label: "Opera",
    color: "#0033cc",
  },
  brave: {
    label: "Brave",
    color: "#0044ff",
  },
  vivaldi: {
    label: "Vivaldi",
    color: "#0022aa",
  },
  ie: {
    label: "Internet Explorer",
    color: "#001199",
  },
  samsung: {
    label: "Samsung Internet",
    color: "#0055ff",
  },
  other: {
    label: "Other",
    color: "#1f2aff",
  },
} satisfies ChartConfig;

export function BrowserPieChart({ clickDetails }: BrowserPieChartProps) {
  // Process data to calculate visitors by browser
  const chartData = React.useMemo(() => {
    const browserCounts: Record<string, number> = {};

    clickDetails.forEach((click) => {
      browserCounts[click.browser] = (browserCounts[click.browser] || 0) + 1;
    });

    return Object.entries(browserCounts).map(([browser, visitors]) => ({
      browser,
      visitors,
      fill: `var(--color-${browser.toLowerCase()})`, // Ensure your Tailwind or CSS has color variables for browsers
    }));
  }, [clickDetails]);

  // Calculate total visitors
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Browser Usage</CardTitle>
        <CardDescription>Browser distribution for visitors</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
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
            <Legend
              formatter={(value, entry) => {
                const payload = entry.payload as unknown as { visitors: number };
                return payload ? `${value} ${payload.visitors}` : value;
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total visitors categorized by browser
        </div>
      </CardFooter>
    </Card>
  );
}
