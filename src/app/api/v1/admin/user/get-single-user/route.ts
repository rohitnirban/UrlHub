import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from 'next-auth';

export async function GET(request: Request) {
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

        const { singleUserId } = await request.json();

        const userFromDB = await UserModel.findById(singleUserId);

        if (!userFromDB) {
            return handleError("No users found", 404);
        }

        return Response.json(
            {
                success: true,
                message: "User found successfully",
                userFromDB
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("Error get single user");
        return handleError("Error get single user", 500);
    }

}