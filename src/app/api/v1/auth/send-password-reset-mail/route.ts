import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
    await dbConnect();

    try {

        const { identifier } = await request.json();

        if (!identifier) {
            return handleError("Identifier is required", 400);
        }

        const user = await UserModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ],
            isVerified: true
        })

        if (!user) {
            return handleError("User not found", 400)
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const secret = process.env.JWT_SECRET!;
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });
        const path = `/reset?token=${token}`
        const resetLink = `${baseUrl}${path}`

        console.log(resetLink);

        return Response.json(
            {
                success: true,
                message: "Reset mail sent successfully"
            },
            {
                status: 200
            }
        );

        //TODO : Mail this resetLink to user



    } catch (error) {
        console.log("Error in sending password reset mail ", error);
        return handleError("Error in sending password reset mail", 500)
    }
}