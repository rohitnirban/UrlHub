import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { User } from 'next-auth';


export async function DELETE(
    request: Request
) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const _user: User = session?.user;

    if (!session || !_user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    try {
        const { username } = await request.json();

        if(!username){
            return handleError("Please provide username to delete account", 400);
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return handleError("User not found", 404);
        }

        await UserModel.deleteOne({ username });

        return Response.json(
            {
                success: true,
                message: 'User deleted successfully.'
            },
            {
                status: 200
            }
        )

    } catch (error: any) {
        console.error("Error deleting user:", error);
        return handleError(error.message, 500);
    }
}
