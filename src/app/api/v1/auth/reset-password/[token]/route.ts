import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import UserModel from "@/models/User";
import { handleError } from "@/helpers/handleError";

const TokenQuerySchema = z.object({
    token: z.string(),
});

export async function POST(
    request: Request,
    { params }: { params: { token: string } }
) {
    await dbConnect();
    
    try {
        // Validate the token
        const { token } = TokenQuerySchema.parse(params);


        if (!token) {
            return handleError("Token is required", 400);
        }

        // Hash the provided token to compare with the stored hashed token
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await UserModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetTokenExpiry: { $gt: Date.now() }, // Ensure the token is not expired
        });

        if (!user) {
            return handleError("Invalid or expired token", 400);
        }

        const { password } = await request.json();

        if (!password) {
            return handleError("Please provide a new password", 400);
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password and clear the reset token fields
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiry = undefined;
        await user.save();

        return Response.json(
            {
                success: true,
                message: "Password reset successfully",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("Error in password reset: ", error);
        return handleError("Error in password reset", 500);
    }
}
