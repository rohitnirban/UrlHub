import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Identifier", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ]
                    });

                    if (!user) {
                        throw new Error("No User found with these credentials")
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your account before logging in")
                    }

                    if (!user.password) {
                        throw new Error("Please login with Google")
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if (isPasswordCorrect) {
                        return user
                    }
                    else {
                        throw new Error("Invalid Credentials");
                    }

                } catch (error: any) {
                    throw new Error(error)
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            await dbConnect();
            if (account?.provider === 'google') {
                const existingUser = await UserModel.findOne({ email: user.email });
                if (!existingUser) {
                    const newUser = new UserModel({
                        name: user.name,
                        email: user.email,
                        username: user.email ? user.email.split('@')[0].replace('.', '_') : '',
                        isVerified: true,
                        isGoogleUser: true,
                        role: "user",
                        googleId: profile?.sub,
                    });
                    await newUser.save();
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.username = user.username
                token.role = user.role
            } else {
                // Retrieve user from database if necessary
                await dbConnect();
                const existingUser = await UserModel.findOne({ email: token.email });
                if (existingUser) {
                    token._id = existingUser._id?.toString();
                    token.isVerified = existingUser.isVerified;
                    token.username = existingUser.username;
                    token.role = existingUser.role;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.username = token.username
                session.user.role = token.role
            }
            return session
        }
    },
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXT_AUTH_SECRET,
}