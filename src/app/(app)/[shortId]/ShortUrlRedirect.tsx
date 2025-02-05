'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

interface Props {
    params: {
        shortId: string;
    };
}

const facts = [
    'Did you know? The first URL was created by Tim Berners-Lee in 1991.',
    'Fun fact: Over 4.6 billion people use the internet, each accessing millions of URLs daily!',
    'A URL stands for Uniform Resource Locator and is the address of a resource on the internet.',
    'Shortened URLs are great for sharing long links quickly and easily.',
    "The world's longest URL has over 2,000 characters!",
    "The most expensive domain name ever sold was 'voice.com' for $30 million.",
    'URLs can include special characters like hyphens, underscores, and even emojis!',
    'Short URLs can help improve click-through rates by making links more attractive.',
    'Some URL shorteners offer analytics to track the performance of your links.',
    'The first ever registered domain name was symbolics.com, registered on March 15, 1985.',
];

export default function ShortUrlRedirect({ params }: Props) {
    const router = useRouter();
    const { shortId } = params;
    const [isLoading, setIsLoading] = useState(true);
    const hasFetched = useRef(false); // Prevent duplicate calls

    // Memoize the fact to avoid re-calculating on every render
    const fact = useMemo(() => facts[Math.floor(Math.random() * facts.length)], []);

    useEffect(() => {
        if (hasFetched.current) return; // Prevent duplicate execution
        hasFetched.current = true;

        async function fetchUrl() {
            try {
                // Fetch URL and IP info in parallel
                const [urlResponse, ipResponse] = await axios.all([
                    axios.get(`/api/v1/url/${shortId}`),
                    axios.get(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`)
                ]);

                const urlData = urlResponse.data;
                if (!urlData?.originalUrl) {
                    router.replace('/404');
                    return;
                }

                if (urlData.isFree) {
                    window.location.href  = urlData.originalUrl; // Redirect using Next.js router
                    return;
                }

                // Check if URL is expired
                if (!urlData.isFree && urlData.urlExpiry) {
                    if (new Date() > new Date(urlData.urlExpiry)) {
                        router.replace('/expired');
                        return;
                    }
                }

                // Handle password protection
                if (urlData.isPasswordProtected) {
                    router.replace(`/password/${shortId}`);
                    return;
                }

                await axios.post('/api/v1/url/update-statistics', {
                    ipAddress: ipResponse.data.ip,
                    userAgent: navigator.userAgent,
                    urlId: shortId,
                });

                // Redirect immediately after analytics update
                router.push(urlData.originalUrl); // Use Next.js router for redirection
            } catch (error) {
                console.error('Error fetching URL data:', error);
                router.replace('/500');
            } finally {
                setIsLoading(false); // Stop loading once everything is done
            }
        }

        fetchUrl();

    }, [shortId, router]);

    return isLoading ? (
        <div className="flex flex-col justify-center items-center h-screen text-center">
            <Loader2 className="animate-spin mb-4" size={50} />
            <p className="text-lg text-black">{fact}</p>
        </div>
    ) : null;
}
