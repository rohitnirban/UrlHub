"use client";

import * as React from "react";
import WorldMap from "react-svg-worldmap";

interface ClickDetail {
  country: string;
  timestamp: string;
  _id: string;
}

interface HorizontalBarProps {
  clickDetails: ClickDetail[];
}

export function HorizontalBar({ clickDetails }: HorizontalBarProps) {
  const [windowWidth, setWindowWidth] = React.useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Count clicks per country
  const countryClickCount = clickDetails.reduce((acc, { country }) => {
    const countryCode = country.toLowerCase(); // Ensure lowercase for world map
    acc[countryCode] = (acc[countryCode] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert to WorldMap expected format
  const data = Object.entries(countryClickCount).map(([country, value]) => ({
    country,
    value,
  }));

  return (
    <div className="w-full flex justify-center items-center">
      <WorldMap
        color="blue"
        tooltipBgColor="black"
        size={windowWidth < 600 ? 300 : windowWidth < 1024 ? 500 : 800}
        data={data}
      />
    </div>
  );
}
