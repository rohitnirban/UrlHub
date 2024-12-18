'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Head from 'next/head';

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
    isFree?: boolean; // Add this to identify if it's a free URL
}

export default function ShortUrlRedirect({ params }: Props) {
    const router = useRouter();
    const { shortId } = params;
    const [isLoading, setIsLoading] = useState(true);
    const [urlData, setUrlData] = useState<UrlData | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchUrl() {
            try {
                console.log("Short ID", shortId);
                const response = await axios.get(`/api/v1/url/${shortId}`);
                console.log(response.data);

                if (!isMounted) return;

                if (response.status !== 200 || !response.data || !response.data.originalUrl) {
                    router.push('/404');
                    return;
                }

                const urlEntry = response.data;
                setUrlData(urlEntry);

                // If it's a free URL, just redirect without tracking
                if (urlEntry.isFree) {
                    router.push(urlEntry.originalUrl);
                    return;
                }

                // If it's a premium URL, handle statistics and then redirect
                const ipResponse = await axios.get(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`);
                const ipAddress = ipResponse.data.ip;

                // Send the statistics data
                await axios.post('/api/v1/url/update-statistics', {
                    ipAddress,
                    userAgent: navigator.userAgent,
                    urlId: shortId
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Redirect after a delay (2 seconds for better UX)
                setTimeout(() => {
                    if (isMounted) {
                        router.push(urlEntry.originalUrl);
                    }
                }, 2000); // Delay the redirect

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

    return (
        <>
            <Head>
                <title>{urlData?.title || 'Redirecting...'}</title>
                {urlData?.icon && <link rel="icon" href={urlData.icon} />}
                <meta name="description" content={urlData?.metaDescription || ''} />
                <meta property="og:title" content={urlData?.title || ''} />
                <meta property="og:description" content={urlData?.metaDescription || ''} />
                <meta property="og:image" content={urlData?.metaImageUrl || ''} />
                <meta property="og:url" content={urlData?.shortUrl || ''} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={urlData?.title || ''} />
                <meta name="twitter:description" content={urlData?.metaDescription || ''} />
                <meta name="twitter:image" content={urlData?.metaImageUrl || ''} />
            </Head>
            {isLoading && (
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className='animate-spin' size={50} />
                </div>
            )}
        </>
    );
}
