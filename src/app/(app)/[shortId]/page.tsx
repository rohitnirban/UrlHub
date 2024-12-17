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
    metaDescription: string;
    metaImageUrl: string;
    shortUrl: string;
    urlId: string;
    title: string;
    icon: string;
    // ... other fields
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
                // Fetch URL data
                const response = await axios.get(`/api/v1/url/${shortId}`);

                if (!isMounted) return;

                if (response.status !== 200 || !response.data || !response.data.originalUrl) {
                    router.push('/404');
                    return;
                }

                const urlEntry = response.data;
                setUrlData(urlEntry);

                // Fetch IP Address
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

                // Redirect to the original URL
                if (isMounted) {
                    router.push(urlEntry.originalUrl);
                }
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
