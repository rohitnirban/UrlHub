'use client';

import { VerticalBar } from '@/components/charts/VerticalBar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import axios from 'axios';
import { BarChart2, Monitor, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define the type for the user stats data
interface UserStats {
  totalUrls: number;
  totalClicks: number;
  activeLinks: number;
}

// Define the type for a card item
interface CardData {
  title: string;
  value: number;
  icon: JSX.Element;
}

// Reusable StatCard component with typed props
const StatCard: React.FC<CardData> = ({ title, value, icon }) => (
  <Card className='lg:min-w-80'>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const Page: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    totalUrls: 0,
    totalClicks: 0,
    activeLinks: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ success: boolean; data: UserStats }>('/api/v1/url/get-user-stats');
        console.log(response.data);
        if (response.data.success) {
          setUserStats(response.data.data);
        } else {
          setError('Failed to fetch stats.');
        }
      } catch (err) {
        setError('Error fetching user stats.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  const cardData: CardData[] = [
    {
      title: 'Total Urls',
      value: userStats.totalUrls,
      icon: <BarChart2 className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: 'Total Clicks',
      value: userStats.totalClicks,
      icon: <Monitor className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: 'Active Urls',
      value: userStats.activeLinks,
      icon: <Settings className="h-4 w-4 text-muted-foreground" />
    }
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-gray-50">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="text-muted-foreground">Loading stats...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center py-10">
            <span className="text-red-500">{error}</span>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cardData.map((card, index) => (
                    <StatCard
                    key={index}
                    title={card.title}
                    value={card.value}
                    icon={card.icon}
                    />
                  ))}
                  </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Card className="flex-grow max-w-screen-lg md:max-w-1/2 lg:max-w-2/3 mx-auto">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-3">
                    <VerticalBar />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </ScrollArea>
  );
};

export default Page;
