import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get('username')
        }

        const result = UsernameQuerySchema.safeParse(queryParams);

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return handleError(usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid Query Parameters", 400)
        }

        const { username } = result.data;

        if (!username) {
            return handleError("Username is required", 400)
        }

        const exisitingVerifiedUserByUsername = await UserModel.findOne({ username, isVerified: true });

        if (exisitingVerifiedUserByUsername) {
            return handleError("Username is already taken", 400)
        }

        return Response.json(
            {
                success: true,
                message: "Username is available"
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("Error in username validation ", error);
        return handleError("Error in username validation", 500)
    }
}