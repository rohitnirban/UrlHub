"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useMemo } from "react";

interface HorizontalBarProps {
  clickDetails: { country: string; timestamp: string; _id: string }[];
}

// Country codes to full names mapping

const countryMapping: Record<string, string> = {
  IN:"India"
};

export function HorizontalBar({ clickDetails }: HorizontalBarProps) {
  // Process data to calculate click counts by country
  const chartData = useMemo(() => {
    const countryCounts: Record<string, number> = {};

    clickDetails.forEach((click) => {
      const fullCountryName = countryMapping[click.country] || click.country; // Fallback to code if no mapping exists
      countryCounts[fullCountryName] = (countryCounts[fullCountryName] || 0) + 1;
    });

    return Object.entries(countryCounts).map(([country, clicks]) => ({
      country,
      clicks,
    }));
  }, [clickDetails]);

  const chartConfig = {
    visitors: {
      label: "Clicks",
    },
  } satisfies ChartConfig;

  return (
    <Card>
  <CardHeader>
    <CardTitle>Country Clicks</CardTitle>
    <CardDescription>Clicks per country</CardDescription>
  </CardHeader>
  <CardContent className="max-h-96">
    <ChartContainer
      config={chartConfig}
      className="max-h-[28rem] responsive-chart-container"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: 0,
          right: 0,
          top: window.innerWidth < 640 ? 20 : 10, // Slightly reduce top margin for small devices
          bottom: 50,
        }}
        barGap={5}
      >
        <YAxis
          dataKey="country"
          type="category"
          tickLine={false}
          tickMargin={1} /* Adjust tick margin for text visibility */
          axisLine={false}
          tick={{ fontSize: window.innerWidth < 640 ? "10px" : "12px" }} /* Reduce font size for small devices */
        />
        <XAxis dataKey="clicks" type="number" hide />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar
          dataKey="clicks"
          layout="vertical"
          radius={[5, 5, 0, 0]}
          barSize={40} /* Fixed bar size to prevent shrinking */
          fill="var(--color-primary)"
        />
      </BarChart>
    </ChartContainer>
  </CardContent>
  <CardFooter className="flex-col items-start gap-2 text-sm">
    <div className="leading-none text-muted-foreground">
      Showing total clicks per country for the selected period
    </div>
  </CardFooter>
</Card>


  );
}
