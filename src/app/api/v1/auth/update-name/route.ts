import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";


export async function PUT(
    request: Request
) {
    await dbConnect();

    try {
        const { newName, username } = await request.json();

        if (!newName) {
            return handleError("Please provide name to edit", 400);
        }

        if(!username){
            return handleError("Please provide username to edit", 400);
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return handleError("User not found", 404);
        }

        user.name = newName;

        await user.save();

        return Response.json(
            {
                success: true,
                message: 'Name updated successfully. Please relogin for changes to take place'
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
