'use client';

import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';

import { Url, columns } from "./columns";
import { DataTable } from "./data-table";
import { Loader2 } from 'lucide-react';

const Page: React.FC = () => {
    const [urls, setUrls] = useState<Url[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/api/v1/admin/url/get-all-urls');
                console.log(response.data);
                const allUrls = Array.isArray(response.data.data) ? response.data.data : [];
                setUrls(allUrls);
                console.log(allUrls);
            } catch (error) {
                console.error('Error fetching allUrls:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Urls Overview</h2>
                </div>
                <div className="space-y-4">
                    <div className="container mx-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center min-h-[70vh]">
                                <span>Please wait</span>
                                <Loader2 className='ml-4 animate-spin' />
                            </div>
                        ) : (
                            <DataTable columns={columns} data={urls} />
                        )}
                    </div>
                </div>
            </div>
        </ScrollArea >
    );
};

export default Page;