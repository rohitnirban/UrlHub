'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDaysIcon, BarChartIcon, TagIcon, CopyIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import axios from 'axios'; // Import axios for making HTTP requests
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { Skeleton } from '@/components/ui/skeleton';
import { ApiLinksResponse, LinkData } from '@/types';
import { ShareButton } from '@/components/ShareButton';
import { useToast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Shadcn Popover
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import Image from 'next/image';

const Page: React.FC = () => {
    const { toast } = useToast();

    const [links, setLinks] = useState<LinkData[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [filteredLinks, setFilteredLinks] = useState<LinkData[]>([]);

    useEffect(() => {
        const fetchLinks = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<ApiLinksResponse>('/api/v1/url/get-all-users');
                setLinks(Array.isArray(response.data.data) ? response.data.data : []);
                setFilteredLinks(response.data.data); // Initialize filtered links with all data
            } catch (error) {
                console.error('Error fetching links:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLinks();
    }, []);

    // Filter links by date range
    useEffect(() => {
        if (startDate && endDate) {
            const start = dayjs(startDate).startOf('day');
            const end = dayjs(endDate).endOf('day');
            const filtered = links.filter((link) =>
                dayjs(link.createdAt).isBetween(start, end, null, '[]')
            );
            setFilteredLinks(filtered);
        } else {
            setFilteredLinks(links);
        }
    }, [startDate, endDate, links]);

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setFilteredLinks(filteredLinks.map(link => ({ ...link, selected: newSelectAll })));
    };

    const handleSelectLink = (id: string) => {
        setFilteredLinks(filteredLinks.map(link =>
            link.id === id ? { ...link, selected: !link.selected } : link
        ));
        setSelectAll(filteredLinks.every(link => link.selected || false));
    };

    const selectedCount = filteredLinks.filter(link => link.selected).length;

    const handleCopy = (content: string) => {
        navigator.clipboard
            .writeText(content)
            .then(() => {
                toast({
                    title: "Success",
                    description: "Link copied to clipboard!",
                });
            })
            .catch((err) => {
                toast({
                    title: "Error",
                    description: "Failed to copy text!",
                    variant: "destructive",
                });
                console.error("Failed to copy text: ", err);
            });
    };

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-gray-50">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Short Url</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="flex items-center">
                                    <CalendarDaysIcon className="mr-2 h-4 w-4" />
                                    {startDate && endDate
                                        ? `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`
                                        : "Filter by date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-4">
                                <div>
                                    <p className="text-sm font-medium mb-2">Start Date</p>
                                    <Calendar
                                        selected={startDate || undefined}
                                        onSelect={(date) => setStartDate(date || null)}
                                        mode="single"
                                        className="rounded-md border"
                                    />
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium mb-2">End Date</p>
                                    <Calendar
                                        selected={endDate || undefined}
                                        onSelect={(date) => setEndDate(date || null)}
                                        mode="single"
                                        className="rounded-md border"
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center md:justify-between space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs sm:text-sm">{selectedCount} selected</span>
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm" disabled={selectedCount === 0}>Export</Button>
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm" disabled={selectedCount === 0}>Hide</Button>
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm" disabled={selectedCount === 0}>Tag</Button>
                    </div>
                    <Select defaultValue="active">
                        <SelectTrigger className="w-full md:w-fit text-xs sm:text-sm">
                            <SelectValue placeholder="Show:" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Show: Active</SelectItem>
                            <SelectItem value="archived">Show: Archived</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm border-gray-300 focus:ring-blue-500 flex-shrink-0"
                        />
                        <span className="font-semibold text-xs sm:text-sm">Select All</span>
                    </div>
                    {isLoading ? (
                        <>
                            {[...Array(3)].map((_, index) => (
                                <Card key={index} className="border-none outline-none transition-shadow duration-300 relative">
                                    <Skeleton className="h-10 w-full mb-2" />
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-6 w-1/2" />
                                </Card>
                            ))}
                        </>
                    ) : (
                        filteredLinks.map((link, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow duration-300 relative">
                                <div className="absolute mt-2 mr-2 top-1 right-1 sm:top-0 sm:right-2 flex space-x-1">
                                    <Button variant="outline" size="sm" className="hover:bg-gray-100 p-2" onClick={() => handleCopy(link?.shortUrl || "")}>
                                        <CopyIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </Button>
                                    <ShareButton
                                        url={link?.shortUrl || ""}
                                        title={link?.title || ""}
                                    />
                                </div>
                                <CardHeader className="pb-2">
                                    <Input
                                        type="checkbox"
                                        checked={link.selected}
                                        onChange={() => handleSelectLink(link.shortUrl)}
                                        className="absolute -mt-2 -ml-2 sm:-mt-3 sm:-ml-3 w-3 h-3 rounded-sm border-gray-50 focus:ring-blue-700 flex-shrink-0"
                                    />
                                </CardHeader>
                                <CardContent className="flex flex-col justify-start items-start -mt-2 ml-2 sm:ml-4">
                                    <div className="flex items-start w-full">
                                        <Image src={`${link.icon}`} alt="favicon" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border mb-2 mr-2 sm:mr-4" />
                                        <div className="w-full">
                                            <Link href={`/dashboard/urls/${link.urlId}`} className="cursor-pointer hover:underline">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="flex items-center space-x-3 w-full">
                                                        <p className="font-semibold text-sm sm:text-lg md:text-xl truncate break-words">
                                                            <span className="block sm:hidden">{link.title.length > 20 ? link.title.substring(0, 20) + '...' : link.title}</span>
                                                            <span className="hidden sm:block md:hidden">{link.title.length > 40 ? link.title.substring(0, 40) + '...' : link.title}</span>
                                                            <span className="hidden md:block">{link.title.length > 60 ? link.title.substring(0, 60) + '...' : link.title}</span>
                                                        </p>
                                                    </CardTitle>
                                                </div>
                                            </Link>
                                            <div className="flex flex-col justify-center items-start mt-1 sm:mt-2">
                                                <a target="_blank" href={link.shortUrl} className="text-blue-600 hover:underline text-xs sm:text-sm">{link.shortUrl}</a>
                                                <a target="_blank" href={link.originalUrl} className="truncate text-gray-500 hover:text-gray-700 text-xs sm:text-sm">
                                                    <span className="block sm:hidden">{link.originalUrl.length > 20 ? link.originalUrl.substring(0, 20) + '...' : link.originalUrl}</span>
                                                    <span className="hidden sm:block md:hidden">{link.originalUrl.length > 40 ? link.originalUrl.substring(0, 40) + '...' : link.originalUrl}</span>
                                                    <span className="hidden md:block">{link.originalUrl.length > 60 ? link.originalUrl.substring(0, 60) + '...' : link.originalUrl}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-wrap justify-start gap-2 pt-2">
                                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-700">
                                        <BarChartIcon size={12} className="sm:w-4 sm:h-4" />
                                        <span>{link.totalClicks} engagements</span>
                                    </div>
                                    <div className="mx-2 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-700">
                                        <CalendarDaysIcon size={12} className="sm:w-4 sm:h-4" />
                                        <span>{dayjs(link.createdAt).format('D MMM YYYY')}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-700">
                                        <TagIcon size={12} className="sm:w-4 sm:h-4" />
                                        <span>{link.tags.length ? link.tags.join(', ') : 'No tags'}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>

                <div className="flex items-center justify-center w-full my-4 sm:my-8">
                    <Separator className="flex-grow" />
                    <span className="px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                        You&apos;ve reached the end of your URLs
                    </span>
                    <Separator className="flex-grow" />
                </div>
            </div>
        </ScrollArea>
    );
};

export default Page;
