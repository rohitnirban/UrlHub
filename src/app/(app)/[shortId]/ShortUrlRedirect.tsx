'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

interface Props {
    params: {
        shortId: string;
    };
}

interface UrlData {
    originalUrl: string;
    shortUrl: string;
    urlId: string;
    metaDescription?: string;
    metaImageUrl?: string;
    title?: string;
    icon?: string;
    isFree?: boolean;
}

// Fun facts array
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
];

export default function ShortUrlRedirect({ params }: Props) {
    const router = useRouter();
    const { shortId } = params;

    const [isLoading, setIsLoading] = useState(true);
    const [fact, setFact] = useState<string>(
        facts[Math.floor(Math.random() * facts.length)]
    );

    useEffect(() => {
        let isMounted = true;

        async function fetchUrl() {
            try {
                const response = await axios.get(`/api/v1/url/${shortId}`);
                if (!isMounted) return;

                if (response.status !== 200 || !response.data?.originalUrl) {
                    router.push('/404');
                    return;
                }

                const urlData: UrlData = response.data;

                if (urlData.isFree) {
                    router.push(urlData.originalUrl);
                    return;
                }

                const ipResponse = await axios.get(
                    `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
                );
                const ipAddress = ipResponse.data.ip;

                await axios.post(
                    '/api/v1/url/update-statistics',
                    {
                        ipAddress,
                        userAgent: navigator.userAgent,
                        urlId: shortId,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                setTimeout(() => {
                    if (isMounted) {
                        router.push(urlData.originalUrl);
                    }
                }, 1000);
            } catch (error) {
                console.error('Error fetching URL data:', error);
                if (isMounted) {
                    router.push('/500');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        fetchUrl();

        return () => {
            isMounted = false;
        };
    }, [shortId, router]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFact(facts[Math.floor(Math.random() * facts.length)]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {isLoading && (
                <div className="flex flex-col justify-center items-center h-screen text-center">
                    <Loader2 className="animate-spin mb-4" size={50} />
                    <p className="text-lg text-black">{fact}</p>
                </div>
            )}
        </>
    );
}
