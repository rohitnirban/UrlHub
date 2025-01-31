'use client';

import React, { useEffect, useState } from 'react';
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
import { useDebounceCallback } from 'usehooks-ts'

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
    const [screenshotUrl, setScreenshotUrl] = useState('');
    const [screenshotUrlMessage, setScreenshotUrlMessage] = useState('');
    const [screenshotUrlLoading, setScreenshotUrlLoading] = useState(false);

    const debounced = useDebounceCallback(setScreenshotUrl, 1000)

    const domain = process.env.NEXT_PUBLIC_SHORT_DOMAIN;

    useEffect(() => {
        const getUrlScreenshot = async () => {
            if (originalUrl) {
                setScreenshotUrlLoading(true);
                try {
                    const microlinkResponse = await axios.get(
                        `https://api.microlink.io?url=${encodeURIComponent(originalUrl)}&screenshot=true&meta=false`
                    );
                    if (microlinkResponse.data.data.screenshot.url) {
                        setScreenshotUrlMessage("Got Screenshot");
                        setScreenshotUrl(microlinkResponse.data.data.screenshot.url);
                    }
                    setScreenshotUrlLoading(false);

                } catch (error: any) {
                    if (error?.response?.data?.code === "EINVALURL") {
                        setScreenshotUrlMessage("Invalid URL");
                    }
                }
            }
        }

        getUrlScreenshot()
    }, [originalUrl])


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
                    <div className="max-w-3xl xl:max-w-5xl mx-auto p-6 mb-20">
                        <h1 className="text-3xl font-extrabold mb-6">Create new</h1>
                        <div className='flex'>
                            <div className="space-y-6 w-full">
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
                            <div className='hidden xl:block mx-4 w-full'>
                                <div className='bg-transparent  h-96 -mt-48'>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="84.965 240 100 125" enable-background="new 84.965 256.099 100 100" >
                                        <switch>
                                            <foreignObject requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/" x="0" y="0" width="1" height="1" />
                                            <g>
                                                <g>
                                                    <path d="M175.115,272.138H94.814c-2.486,0-4.51,2.022-4.51,4.509v53.98c0,2.486,2.023,4.509,4.51,4.509h80.301c2.486,0,4.51-2.022,4.51-4.509v-53.98C179.625,274.16,177.602,272.138,175.115,272.138z M178.625,330.627c0,1.935-1.574,3.509-3.51,3.509H94.814c-1.936,0-3.51-1.574-3.51-3.509v-53.98c0-1.935,1.574-3.509,3.51-3.509h80.301c1.936,0,3.51,1.574,3.51,3.509V330.627z" />
                                                    <path d="M175.115,274.66H94.814c-1.096,0-1.986,0.891-1.986,1.986v50.764c0,1.096,0.891,1.986,1.986,1.986h80.301c1.096,0,1.986-0.891,1.986-1.986v-50.764C177.102,275.551,176.211,274.66,175.115,274.66z M176.602,327.41c0,0.82-0.666,1.486-1.486,1.486H94.814c-0.82,0-1.486-0.666-1.486-1.486v-50.764c0-0.819,0.666-1.486,1.486-1.486h80.301c0.82,0,1.486,0.667,1.486,1.486V327.41z" />
                                                    <path d="M139.98,330.384h-10.031c-0.58,0-1.052,0.471-1.052,1.051v0.787c0,0.58,0.472,1.052,1.052,1.052h10.031c0.58,0,1.052-0.472,1.052-1.052v-0.787C141.032,330.854,140.561,330.384,139.98,330.384z M140.532,332.222c0,0.305-0.247,0.552-0.552,0.552h-10.031c-0.305,0-0.552-0.247-0.552-0.552v-0.787c0-0.304,0.247-0.551,0.552-0.551h10.031c0.305,0,0.552,0.247,0.552,0.551V332.222z" />
                                                </g>
                                            </g>
                                        </switch>
                                    </svg>
                                </div>
                                <div className="sticky -mt-[13.6rem] ml-[2.5rem] z-100 ">
                                    {screenshotUrlLoading ? (
                                        <div className="flex justify-center items-center w-[24.5rem] h-[15.8rem] h-60 bg-gray-200 rounded-lg shadow-lg">
                                            <span className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10"></span>
                                        </div>
                                    ) : screenshotUrl && screenshotUrlMessage === "Got Screenshot" ? (
                                        <img
                                            src={screenshotUrl}
                                            alt="Website preview"
                                            className="w-[24.5rem] h-[15.8rem] rounded-lg shadow-lg"
                                        />
                                    ) : (
                                        <div className="text-lg text-center -ml-8 mt-[6.5rem]">
                                            {screenshotUrlMessage === "Invalid URL"
                                                ? "Please enter a valid URL"
                                                : "Enter Destination to see its preview here."}
                                        </div>
                                    )}
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


