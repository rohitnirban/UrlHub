import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
    await dbConnect();

    try {

        const { username, code } = await request.json();

        if (!username && !code) {
            return handleError("Username and code both required", 400)
        }

        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
            return handleError("User not found", 400)
        }

        const isCodeValid = code === user.verifyCode;
        const isCodeNotExipred = new Date(user.verifyCodeExpiry) > new Date();


        if (isCodeValid && isCodeNotExipred) {
            user.isVerified = true;
            await user.save();

            return Response.json(
                {
                    success: true,
                    message: "User Verified Successfully"
                },
                {
                    status: 200
                }
            )
        }
        else if (!isCodeNotExipred) {
            return handleError("Verification Code Expired. Please register again to get new code", 400)
        }
        else {
            return handleError("Invalid Verification Code", 400)
        }

    } catch (error) {
        console.log("Error in code verification ", error);
        return handleError("Error in code verification", 500)
    }
}