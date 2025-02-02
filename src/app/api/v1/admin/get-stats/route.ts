import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import FreeUrlModel from "@/models/FreeUrl";
import UrlModel from "@/models/Url";
import UserModel from "@/models/User";
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

        const user = await UserModel.findById(userId);

        if (!user) {
            return handleError("User not found", 404);
        }

        if (user.role !== "admin") {
            return handleError("Unauthorized", 401);
        }

        const urls = await UrlModel.find({});
        const freeUrls = await FreeUrlModel.find({});
        const users = await UserModel.find({});

        const totalUrls = urls.length;
        const totalClicks = urls.reduce((acc, url) => acc + (url.totalClicks || 0), 0);
        const totalFreeUrls = freeUrls.length;
        const totalUsers = users.length;

        const data = {
            totalUrls, totalClicks, totalFreeUrls, totalUsers
        }

        const recentUrls = urls.slice(-5).reverse();
        const recentFreeUrls = freeUrls.slice(-5).reverse();
        const recentUsers = users.slice(-5).reverse();


        return Response.json(
            {
                success: true,
                data,
                recentUrls,
                recentFreeUrls,
                recentUsers
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
