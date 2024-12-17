import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs'
import { handleError } from "@/helpers/handleError";

const TokenQuerySchema = z.object({
    token: z.string()
})

interface DecodedToken extends JwtPayload {
    userID: string;
}

export async function POST(request: Request) {
    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const queryParams = {
            token: searchParams.get('token')
        }

        const result = TokenQuerySchema.safeParse(queryParams);

        if (!result.success) {
            const tokenErrors = result.error.format().token?._errors || []
            return handleError(tokenErrors?.length > 0 ? tokenErrors.join(", ") : "Invalid Query Parameters", 400)
        }

        const { token } = result.data;

        if (!token) {
            return handleError("Token is required", 400);
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        const userID = decodedToken.userID;

        if (!userID) {
            return handleError("Invalid Token", 400)
        }

        const user = await UserModel.findById(userID);

        if (!user) {
            return handleError("User not found", 404)
        }

        const { password } = await request.json();

        if (!password) {
            return handleError("Please provide password to set new password", 400)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.save();

        return Response.json(
            {
                success: true,
                message: "Password Reset Successfully"
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("Error in password reset ", error);
        return handleError("Error in password reset", 500);
    }
}