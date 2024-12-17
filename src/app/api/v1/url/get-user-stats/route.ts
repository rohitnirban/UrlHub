import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UrlModel from "@/models/Url";
import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";

export async function GET() {
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

        const urls = await UrlModel.find({ user: userId });

        const totalUrls = urls.length;
        const totalClicks =  urls.reduce((acc, url) => acc + (url.totalClicks || 0), 0);
        const activeLinks = urls.reduce((acc,url) => acc + (url.status === 'active' ? 1 : 0), 0 );

        const data = {
            totalUrls, totalClicks, activeLinks
        }

        const clickAccToMonth = urls.reduce((acc: { [key: string]: number }, url) => {
            url.clickDetails.forEach((click: { timestamp: Date }) => {
                const month = new Date(click.timestamp).toISOString().slice(0, 7); // Get YYYY-MM format
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += 1;
            });
            return acc;
        }, {});

        // Filter out months with zero clicks
        const filteredClickAccToMonth = Object.fromEntries(
            Object.entries(clickAccToMonth).filter(([_, clicks]) => clicks > 0)
        );

        return Response.json(
            {
                success: true,
                data,
                totalClicksAccToMonth: filteredClickAccToMonth
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("Error getting stats ", error);
        return handleError("Error getting stats", 500)
    }
}
