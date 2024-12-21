import ResetPasswordEmail from "@/emails/ResetPassword";
import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import crypto from "crypto";
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

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
        });

        if (!user) {
            return handleError("User not found", 400);
        }

        // Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        // Hash the token and store it in the database
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.passwordResetToken = hashedToken;
        user.passwordResetTokenExpiry = new Date(tokenExpiry);
        await user.save();

        // Construct the reset link
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const path = `/reset?token=${resetToken}`;
        const resetLink = `${baseUrl}${path}`;

        console.log(resetLink);

        await resend.emails.send({
            from: 'no-reply@urhb.in',
            to: user.email,
            subject: 'UrlHub Verification Code',
            react: ResetPasswordEmail({ userFirstname: user.name, resetPasswordLink: resetLink }),
        });

        return Response.json(
            {
                success: true,
                message: "Reset mail sent successfully"
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("Error in sending password reset mail", error);
        return handleError("Error in sending password reset mail", 500);
    }
}
