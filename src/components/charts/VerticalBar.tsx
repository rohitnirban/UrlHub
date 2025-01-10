"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import axios from "axios";

// Chart configuration for styling
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#000be2",
  },
} satisfies ChartConfig;

// Predefined array of all months
const ALL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Helper function to convert YYYY-MM to month name
const getMonthName = (dateString: string): string => {
  const [year, month] = dateString.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleString("default", {
    month: "long",
  });
};

export function VerticalBar() {
  const [chartData, setChartData] = useState<{ month: string; clicks: number }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/v1/url/get-user-stats");
        if (response.data.success) {
          // Transform the response data
          const rawData = response.data.totalClicksAccToMonth;

          // Map fetched data onto the predefined months, filling gaps with 0
          const transformedData = ALL_MONTHS.map((month, index) => {
            const monthKey = `${new Date().getFullYear()}-${String(index + 1).padStart(2, "0")}`; // Format as YYYY-MM
            return {
              month,
              clicks: rawData[monthKey] || 0, // Default to 0 if no data for the month
            };
          });

          setChartData(transformedData);
        } else {
          setError("Failed to fetch stats.");
        }
      } catch (err) {
        setError("Error fetching user stats.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)} // Show the first three letters of the month
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="clicks"
          fill="var(--color-desktop)"
          radius={8}
          barSize={60}
        >
          <LabelList
            dataKey="clicks"
            position="top"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
