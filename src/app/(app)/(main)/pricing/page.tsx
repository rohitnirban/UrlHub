import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FAQ } from "@/components/home/FAQ";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isSubscribed: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "₹0",
    description: "Everything you need to get started",
    features: ["1,000 Connections", "1 Team Member", "Basic Analytics"],
    buttonText: "Subscribed",
    isSubscribed: true,
  },
//   {
//     name: "Pro",
//     price: "₹29",
//     description: "For growing teams and businesses",
//     features: ["10,000 Connections", "5 Team Members", "Advanced Analytics"],
//     buttonText: "Upgrade to Pro",
//     isSubscribed: false,
//   },
];

const PricingCard: React.FC<{ tier: PricingTier }> = ({ tier }) => (
  <Card className="flex flex-col max-w-md w-full">
    <CardHeader>
      <CardTitle>{tier.name}</CardTitle>
      <CardDescription>{tier.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-3xl font-bold mb-4">
        {tier.price}
        <span className="text-sm font-normal">/month</span>
      </p>
      <ul className="space-y-2">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full select-none" disabled={tier.isSubscribed}>
        {tier.buttonText}
      </Button>
    </CardFooter>
  </Card>
);

const PricingTable: React.FC = () => (
  <>
    <div className="container mx-auto px-4 py-8">
      <div className="mt-8 mb-16">
        <h1 className="text-center font-extrabold text-4xl md:text-5xl tracking-tight text-black mb-8">
          UrlHub Pricing Plans
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Choose the perfect UrlHub plan for your link management needs. Unlock powerful features and grow your online
          presence with our flexible pricing options.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </div>
    <FAQ />
    <div className="mb-20"></div>
  </>
);

export default PricingTable;
