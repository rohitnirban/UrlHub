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
    urlExpiry: Date;
    isPasswordProtected: boolean;
    password?: string;
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
    'The first ever registered domain name was symbolics.com, registered on March 15, 1985.',
    'There are over 1.7 billion websites on the internet today.',
    'The .com domain extension stands for "commercial" and is the most popular top-level domain.',
    'The internet was originally called ARPANET and was developed by the U.S. Department of Defense.',
    'The first search engine was called Archie, created in 1990.',
    'The term "surfing the internet" was coined by a librarian named Jean Armour Polly in 1992.',
    'The first email was sent by Ray Tomlinson to himself in 1971.',
    'The first webcam was used to monitor a coffee pot at the University of Cambridge.',
    'The first video ever uploaded to YouTube was titled "Me at the zoo" by co-founder Jawed Karim.',
    'The term "spam" for unsolicited emails comes from a Monty Python sketch.',
    'The first tweet was sent by Jack Dorsey on March 21, 2006, and read "just setting up my twttr".',
    'The first website is still online and can be visited at info.cern.ch.',
    'The first online purchase was a Sting CD sold by NetMarket in 1994.',
    'The first banner ad appeared on HotWired.com in 1994 and had a 44% click-through rate.',
    'The first domain name ever registered was symbolics.com on March 15, 1985.',
    'The first search engine was called "Archie," created in 1990 by Alan Emtage.'
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

                if (response.status !== 200 || !response.data?.originalUrl) {
                    router.push('/404');
                    return;
                }

                const urlData: UrlData = response.data;

                if (urlData.isFree) {
                    // router.push(urlData.originalUrl);
                    window.location.href = urlData.originalUrl;
                    return;
                }

                if (!urlData.isFree) {
                    const currentDate = new Date();
                    const urlExpiryDate = new Date(urlData.urlExpiry);
                    if (currentDate > urlExpiryDate) {
                        router.push('/expired');
                        return;
                    }
                }

                if (urlData.isPasswordProtected) {
                    router.push(`/password/${shortId}`);
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


                if (!isMounted) return;
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
        }, 5000);

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
