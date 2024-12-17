import VerifyEmail from "@/emails/VerifyEmail";
import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

interface UserFields {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
}

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, username, email, password } = await request.json();

        const fields: UserFields = { name, username, email, password };
        const requiredFields: Record<keyof UserFields, string> = {
            name: "Name is required",
            username: "Username is required",
            email: "Email is required",
            password: "Password is required"
        };

        // Validation check
        for (const [field, message] of Object.entries(requiredFields)) {
            if (!fields[field as keyof UserFields]) {
                return handleError(message, 400);
            }
        }

        // Check if the username is already taken by a verified user
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            return handleError("Username already taken", 409);
        }

        // Check if the email is already registered
        const existingUserByEmail = await UserModel.findOne({
            email
        });

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return handleError("User already exists", 400);
            } else {
                // Update the existing user's password and verification code
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            // Create a new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                name,
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                role: 'user',
            });

            await newUser.save();
        }

        // TODO: Sending Mail

        console.log(verifyCode);

        await resend.emails.send({
            from: 'no-reply@urlhub.rohitnirban.com',
            to: email,
            subject: 'UrlHub Verification Code',
            react: VerifyEmail({ verifyCode }),
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "User Registered Successfully"
            }),
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("Error registering user ", error);
        return handleError("Error registering user. Try Changing the email or username", 500);
    }
}
