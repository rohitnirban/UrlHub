import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://urhb.in/',
            lastModified: new Date('2025-01-29T00:00:00+00:00'),
            changeFrequency: 'weekly',
            priority: 1.00,
        },
        {
            url: 'https://urhb.in/why-urlhub',
            lastModified: new Date('2024-12-18T23:18:25+00:00'),
            changeFrequency: 'yearly',
            priority: 0.80,
        },
        {
            url: 'https://urhb.in/login',
            lastModified: new Date('2024-12-18T23:18:25+00:00'),
            changeFrequency: 'yearly',
            priority: 0.80,
        },
        {
            url: 'https://urhb.in/register',
            lastModified: new Date('2024-12-18T23:18:25+00:00'),
            changeFrequency: 'yearly',
            priority: 0.80,
        },
        {
            url: 'https://urhb.in/products',
            lastModified: new Date('2024-12-18T23:18:25+00:00'),
            changeFrequency: 'yearly',
            priority: 0.80,
        },
        {
            url: 'https://urhb.in/pricing',
            lastModified: new Date('2024-12-18T23:18:25+00:00'),
            changeFrequency: 'yearly',
            priority: 0.80,
        },
        {
            url: 'https://urhb.in/features',
            lastModified: new Date('2024-12-18T23:18:25+00:00'),
            changeFrequency: 'yearly',
            priority: 0.64,
        },
    ];
}

export const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name":"UrlHub",
    "url": "https://urhb.in/",
    "description": "Best free URL shortener to shorten, track, and manage links.",
    "potentialAction": [
        {
            "@type": "ViewAction",
            "target": "https://urhb.in/why-urlhub"
        },
        {
            "@type": "RegisterAction",
            "target": "https://urhb.in/register"
        },
        {
            "@type": "LoginAction",
            "target": "https://urhb.in/login"
        },
        {
            "@type": "ViewAction",
            "target": "https://urhb.in/pricing"
        }
    ]
};
