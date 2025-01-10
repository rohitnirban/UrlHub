import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import UserModel from "@/models/User";
import { User } from 'next-auth';
import mongoose from "mongoose";
import { handleError } from "@/helpers/handleError";
import UrlModel from "@/models/Url";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

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
        const user = await UserModel.findById(userId).select("-password");

        if (!user) {
            return handleError("User not found", 404)
        }

        const url = await UrlModel.find({ user: userId });

        if (!url) {
            return handleError("Url not found", 404);
        }
        
        return Response.json(
            {
                success: true,
                data: url
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("Error getting url ", error);
        return handleError("Error getting url", 500)
    }
}