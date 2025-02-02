import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import UserModel from "@/models/User";
import { User } from 'next-auth';
import mongoose from "mongoose";
import { handleError } from "@/helpers/handleError";
import UrlModel from "@/models/Url";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { URL } from "url";
import bcrypt from "bcryptjs";
import { checkUrlId } from "@/helpers/checkUrlId";
import { getUrlMetadata } from "@/helpers/getUrlMetadata";
import { ssid } from "ssid";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateShortId = ssid(8, alphabet); // Generates an 8-character ID

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const _user: User = session?.user;

    if (!session || !_user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    const userId = new mongoose.Types.ObjectId(_user._id);

    try {

        const { title, urlId, originalUrl, tags, isUrlExpiry, urlExpiry, isPasswordProtected, password } = await request.json();

        if (!originalUrl) {
            return handleError("Original URL is required", 400);
        }

        try {
            new URL(originalUrl);
        } catch {
            return handleError("Invalid URL Format", 400);
        }

        // Remove UTM parameters from the original URL to check in the database
        const requestUrlObj = new URL(originalUrl);
        const strippedOriginalUrl = requestUrlObj.href;

        const urlExists = await UrlModel.findOne({ originalUrl: strippedOriginalUrl })

        if (urlExists) {
            return handleError("URL already exists", 400);
        }

        if(isUrlExpiry && !urlExpiry) {
            return handleError("Expiry date is required", 400);
        }

        if (urlExpiry && new Date(urlExpiry).getTime() <= Date.now() + 24 * 60 * 60 * 1000 - 1) {
            return handleError("Expiry date must be at least 24 hours from now", 400);
        }

        if (isPasswordProtected && !password) {
            return handleError("Password is required", 400);
        }

        if (isPasswordProtected && password.length < 5) {
            return handleError("Password must be at least 5 characters long", 400);
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return handleError("User not found", 404);
        }

        const { urlTitle, description, imageUrl } = await getUrlMetadata(originalUrl);

        // Extract domain from the original URL
        const originalUrlDomain = requestUrlObj.hostname;
        const urlIcon = `https://www.google.com/s2/favicons?domain=${originalUrlDomain}&sz=32` || 'https://cdn-icons-png.flaticon.com/512/7046/7046086.png';

        // Check urlID
        if (urlId) {
            const isUrlIDCorrect = checkUrlId(urlId);

            if (!isUrlIDCorrect) {
                return handleError("Please enter correct custom back half. It only contains letters and numbers having at least 6 and at most 12 characters", 400);
            }
        }

        const shortId = urlId ? urlId : generateShortId.toLowerCase();

        const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}`;
        const hashedPassword = isPasswordProtected ? await bcrypt.hash(password, 10) : '';

        const newUrl = new UrlModel({
            originalUrl: strippedOriginalUrl,
            metaDescription: description || description === '' ? title : urlTitle,
            metaImageUrl: imageUrl,
            shortUrl,
            urlId: urlId ? urlId : shortId,
            isUrlExpiry: isUrlExpiry || false,
            urlExpiry: urlExpiry || null,
            isPasswordProtected: isPasswordProtected || false,
            password: hashedPassword || '',
            title: title || urlTitle,
            icon: urlIcon,
            user,
            totalClicks: 0,
            tags: Array.isArray(tags) ? tags : [],
        });

        await newUrl.save();

        return Response.json(
            {
                success: true,
                message: "URL Created Successfully",
                urlId: newUrl.urlId,
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("Error creating url ", error);
        return handleError("Error creating url", 500);
    }
}
