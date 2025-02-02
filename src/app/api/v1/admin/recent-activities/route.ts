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

        //I want to get the latest 5 users, urls and free urls
        const data = {
            urls: urls.slice(0, 5),
            freeUrls: freeUrls.slice(0, 5),
            users: users.slice(0, 5)
        }

        return Response.json(
            {
                success: true,
                data,
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("Error getting recent activites ", error);
        return handleError("Error getting recent activites", 500)
    }
}
