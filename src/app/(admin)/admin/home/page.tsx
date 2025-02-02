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
import { RecentUserActivites } from './RecentUserActivities';
import { RecentUrlActivites } from './RecentUrlActivities';
import { RecentFreeUrlActivites } from './RecentFreeUrlActivites';

// Define the type for the user stats data
interface Stats {
    totalFreeUrls: number;
    totalUrls: number;
    totalClicks: number;
    totalUsers: number;
}
export interface RecentUser {
    name: string;
    username: string;
    email: string;
}
export interface RecentUrl {
    originalUrl: string;
    shortUrl: string;
    totalClicks: number;
}
export interface RecentFreeUrl {
    originalUrl: string;
    shortUrl: string;
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
    const [stats, setStats] = useState<Stats>({
        totalFreeUrls: 0,
        totalUrls: 0,
        totalClicks: 0,
        totalUsers: 0,
    });
    const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
    const [recentUrls, setRecentUrls] = useState<RecentUrl[]>([]);
    const [recentFreeUrls, setRecentFreeUrls] = useState<RecentFreeUrl[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await axios.get<{ success: boolean; data: Stats; recentUsers: RecentUser[]; recentUrls: RecentUrl[]; recentFreeUrls: RecentFreeUrl[] }>('/api/v1/admin/get-stats');
                console.log(response.data);
                if (response.data.success) {
                    setStats(response.data.data);
                    setRecentUsers(response.data.recentUsers);
                    setRecentUrls(response.data.recentUrls);
                    setRecentFreeUrls(response.data.recentFreeUrls);
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

        fetchStats();
    }, []);

    const cardData: CardData[] = [
        {
            title: 'Total Free Urls',
            value: stats.totalFreeUrls,
            icon: <BarChart2 className="h-4 w-4 text-muted-foreground" />
        },
        {
            title: 'Total Urls',
            value: stats.totalUrls,
            icon: <Monitor className="h-4 w-4 text-muted-foreground" />
        },
        {
            title: 'Total Clicks',
            value: stats.totalClicks,
            icon: <Monitor className="h-4 w-4 text-muted-foreground" />
        },
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: <Monitor className="h-4 w-4 text-muted-foreground" />
        },
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
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {cardData.map((card, index) => (
                                    <StatCard
                                        key={index}
                                        title={card.title}
                                        value={card.value}
                                        icon={card.icon}
                                    />
                                ))}
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
                                <Card className="col-span-4 md:col-span-2">
                                    <CardHeader>
                                        <CardTitle>Recent Users</CardTitle>
                                        <CardDescription>
                                            Latest users who signed up.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RecentUserActivites data={recentUsers} />
                                    </CardContent>
                                </Card>
                                <Card className="col-span-4 md:col-span-2">
                                    <CardHeader>
                                        <CardTitle>Recent Urls</CardTitle>
                                        <CardDescription>
                                            Recent urls created by users.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RecentUrlActivites data={recentUrls} />
                                    </CardContent>
                                </Card>
                                <Card className="col-span-4 md:col-span-2">
                                    <CardHeader>
                                        <CardTitle>Recent Free Urls</CardTitle>
                                        <CardDescription>
                                            Recent free urls created by users.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RecentFreeUrlActivites data={recentFreeUrls} />
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
