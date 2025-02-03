import dbConnect from "@/lib/dbConnect";
import { handleError } from "@/helpers/handleError";
import FreeUrlModel from "@/models/FreeUrl";
import { URL } from "url";
import { ssid } from "ssid";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateShortId = ssid(8, alphabet); // Generates an 8-character ID


export async function POST(request: Request) {
    await dbConnect();
    try {
        const { originalUrl } = await request.json();
        
        if (!originalUrl) {
            return handleError("Original URL is required", 400);
        }

        try {
            new URL(originalUrl);
        } catch {
            return handleError("Invalid URL Format", 400);
        }

        const url = await FreeUrlModel.findOne({ originalUrl });

        if (url) {
            return handleError("Destination URL already exists, try changing it", 400);
        }

        const shortId = generateShortId.toLowerCase();

        const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}`;


        const newUrl = new FreeUrlModel({
            originalUrl,
            shortUrl,
            urlId: shortId,
            isFree: true
        });

        await newUrl.save();

        return Response.json(
            {
                success: true,
                message: "URL Created Successfully",
                data:shortUrl
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
