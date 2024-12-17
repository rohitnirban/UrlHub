'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

const CreateNewForm = () => {

    //TODO: When user click create then redirect it to link page
    const router = useRouter()

    const [originalUrl, setOriginalUrl] = useState('');
    const [title, setTitle] = useState('');
    const [customBackHalf, setCustomBackHalf] = useState('');
    const [loading, setLoading] = useState(false);

    const domain = process.env.NEXT_PUBLIC_SHORT_DOMAIN;

    const handleSubmit = async () => {
        if (!originalUrl) {
            toast({ title: "Error", description: "Destination URL is required.", variant: "destructive" });
            return;
        }

        const data = {
            originalUrl,
            title,
            urlId: customBackHalf || undefined // Optional custom back-half
        };

        try {
            setLoading(true);
            const response = await axios.post('/api/v1/url/create', data);
            console.log(response.data);
            if (response.data.success) {
                toast({ title: "Success", description: "Short URL created successfully!" });
                setOriginalUrl(''); // Reset form fields
                setTitle('');
                setCustomBackHalf('');
                router.replace('/dashboard/urls/')
            } else {
                toast({ title: "Error", description: response.data.message || "Something went wrong", variant: "destructive" });
            }
        } catch (error:any) {
            console.log(error);
            toast({ title: "Error", description: error.response.data.message || "Failed to create short URL.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.replace('/dashboard/home')
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="max-w-3xl mx-auto p-6 mb-20">
                        <h1 className="text-3xl font-extrabold mb-6">Create new</h1>
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 font-medium">Destination</label>
                                <Input
                                    placeholder="https://example.com/my-long-url"
                                    value={originalUrl}
                                    onChange={(e) => setOriginalUrl(e.target.value)}
                                />
                                <p className="text-sm text-gray-500 mt-1">You can create a short URL using your long URL</p>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Title (optional)</label>
                                <Input
                                    placeholder="Enter title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Ways to share</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block mb-2 font-medium">Short link</label>
                                        <div className="flex space-x-2">
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={`${domain}`} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={`${domain}`}>{domain}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                placeholder="Custom back-half (optional)"
                                                value={customBackHalf}
                                                onChange={(e) => setCustomBackHalf(e.target.value)}
                                                className="flex-grow"
                                            />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">You can create custom back-halves.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
            <Separator />
            <div className="sticky bottom-0 bg-background border-t">
                <div className="max-w-3xl mx-auto p-4 flex justify-end space-x-4">
                    <Button variant="outline" disabled={loading} onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSubmit} type='submit' disabled={loading}>
                        {loading ? "Creating..." : "Create"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewForm;


