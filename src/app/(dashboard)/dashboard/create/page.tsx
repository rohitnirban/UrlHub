'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from '@/components/ui/switch';

const CreateNewForm = () => {

    //TODO: When user click create then redirect it to link page
    const router = useRouter()

    const [originalUrl, setOriginalUrl] = useState('');
    const [title, setTitle] = useState('');
    const [customBackHalf, setCustomBackHalf] = useState('');
    const [customExpiry, setCustomExpiry] = useState<Date | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [passwordProtected, setPasswordProtected] = useState(false);
    const [password, setPassword] = useState('');

    const domain = process.env.NEXT_PUBLIC_SHORT_DOMAIN;

    const handleSubmit = async () => {
        if (!originalUrl) {
            toast({ title: "Error", description: "Destination URL is required.", variant: "destructive" });
            return;
        }

        const data = {
            originalUrl,
            title,
            urlId: customBackHalf || undefined, // Optional custom back-half
            urlExpiry: customExpiry || undefined, // Optional custom expiry
            isPasswordProtected: passwordProtected,
            password: passwordProtected ? password : undefined,
        };

        console.log(data);

        try {
            setLoading(true);
            const response = await axios.post('/api/v1/url/create', data);
            console.log(response.data);
            if (response.data.success) {
                toast({ title: "Success", description: "Short URL created successfully!" });
                setOriginalUrl(''); // Reset form fields
                setTitle('');
                setCustomBackHalf('');
                router.replace(`/dashboard/urls/${response.data.urlId}`)
            } else {
                toast({ title: "Error", description: response.data.message || "Something went wrong", variant: "destructive" });
            }
        } catch (error: any) {
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
                                <div className="space-y-4 mt-4">
                                    <div>
                                        <label className="block mb-2 font-medium">Link Expiry</label>
                                        <div className="flex space-x-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[280px] justify-start text-left font-normal",
                                                            !customExpiry && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {customExpiry ? format(customExpiry, "PPP") : <span>Pick a Expiry date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={customExpiry}
                                                        onSelect={setCustomExpiry}
                                                        disabled={(date) => {
                                                            const today = new Date();
                                                            return date <= today;
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Once set, it cannot be changed (default is 100 years).</p>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <h2 className="text-xl font-semibold mb-4">Password Protection</h2>
                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <label htmlFor="passwordToggle" className="toggle-label">Add password</label>
                                                <Switch
                                                    id="passwordToggle"
                                                    checked={passwordProtected}
                                                    onCheckedChange={setPasswordProtected}
                                                />
                                            </div>
                                        </div>
                                        {passwordProtected && (
                                            <div className="mt-4">
                                                <label className="block mb-2 font-medium">Password</label>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    minLength={5}
                                                    required
                                                />
                                                <p className="text-sm text-gray-500 mt-1">Once set, cannot be changed</p>
                                            </div>
                                        )}
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


