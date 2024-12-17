import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";


export async function DELETE(
    request: Request
) {
    await dbConnect();

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
        console.error("Error changing user name:", error);
        return handleError(error.message, 500);
    }
}
