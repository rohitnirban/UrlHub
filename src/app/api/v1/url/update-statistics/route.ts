import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UrlModel from "@/models/Url";
import axios from "axios";
import UAParser from "ua-parser-js";

interface StatisticEntry {
    name: string;
    clicks: number;
}

interface Statistics {
    country: StatisticEntry[];
    city: StatisticEntry[];
    device: StatisticEntry[];
    browser: StatisticEntry[];
    os: StatisticEntry[];
    referrer: StatisticEntry[];
}

export async function POST(request: Request) {
    await dbConnect();
    
    try {
        const { ipAddress, userAgent, urlId } = await request.json();

        if (!ipAddress || !userAgent || !urlId) {
            return handleError("All fields are required", 400);
        }

        const url = await UrlModel.findOne({ urlId });

        if (!url) {
            return handleError("URL not found", 404);
        }

        const ipInfoResponse = await axios.get(`https://ipinfo.io/${ipAddress}/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`);
        const { country, city } = ipInfoResponse.data;

        const parser = new UAParser(userAgent);
        const { device, browser, os } = parser.getResult();

        const deviceType = device.model || 'Unknown';
        const browserName = browser.name || 'Unknown';
        const osName = os.name || 'Unknown';
        const referrer = request.headers.get('referer') || 'direct';

        url.clickDetails.push({
            country,
            city,
            device: deviceType,
            browser: browserName,
            os: osName,
            referrer,
            timestamp: new Date(),
        });

        url.totalClicks += 1;

        updateStatistics(url.statistics as Statistics, country, city, deviceType, browserName, osName, referrer);

        await url.save();

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error("Error processing click:", error);
        return handleError("Internal server error", 500);
    }
}

function updateStatistics(
    statistics: Statistics,
    country: string,
    city: string,
    device: string,
    browser: string,
    os: string,
    referrer: string
): void {
    incrementStatistic(statistics.country, country);
    incrementStatistic(statistics.city, city);
    incrementStatistic(statistics.device, device);
    incrementStatistic(statistics.browser, browser);
    incrementStatistic(statistics.os, os);
    incrementStatistic(statistics.referrer, referrer);
}

function incrementStatistic(statArray: StatisticEntry[], name: string): void {
    let stat = statArray.find((s) => s.name === name);
    if (stat) {
        stat.clicks += 1;
    } else {
        // Create a new entry if it doesn't exist
        statArray.push({ name, clicks: 1 });
    }
}
