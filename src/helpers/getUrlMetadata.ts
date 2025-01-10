// src/helpers/getUrlMetadata.ts
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

export async function getUrlMetadata(url: string) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const root = parse(html);

        const description = root.querySelector('meta[name="description"]')?.getAttribute('content') || 
                            root.querySelector('meta[property="og:description"]')?.getAttribute('content');

        const imageUrl = root.querySelector('meta[property="og:image"]')?.getAttribute('content');

        const urlTitle = root.querySelector('title')?.text || 
                      root.querySelector('meta[property="og:title"]')?.getAttribute('content');

        return {
            description: description || '',
            imageUrl: imageUrl || 'https://cdn-icons-png.flaticon.com/512/7046/7046086.png',
            urlTitle: urlTitle || '',
        };
    } catch (error) {
        console.error('Error fetching URL metadata:', error);
        return {
            description: '',
            imageUrl: '',
            urlTitle: '',
        };
    }
}
