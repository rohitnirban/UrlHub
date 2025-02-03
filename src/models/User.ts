import mongoose, { Schema, Document } from "mongoose";

export interface Subscription extends Document {
    subscriptionStartDate: string;
    subscriptionEndDate: string;
}

export interface User extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    username: string;
    email: string;
    password?: string;
    verifyCode?: string;
    verifyCodeExpiry?: Date;
    isVerified: boolean;
    isSubscribed: boolean;
    role: string;
    subscription: Subscription[];
    passwordResetToken?: string;
    passwordResetTokenExpiry?: Date;
    googleId?: string;
    isGoogleUser: boolean;
}

const UserSchema: Schema<User> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: [function (this: User) {
                return !this.isGoogleUser;
            }, "Password is required"],
        },
        verifyCode: {
            type: String,
            required: [function (this: User) {
                return !this.isGoogleUser;
            }, "Verification code is required"],
        },
        verifyCodeExpiry: {
            type: Date,
            required: [function (this: User) {
                return !this.isGoogleUser;
            }, "Verification code expiry is required"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isSubscribed: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        subscription: [
            {
                subscriptionStartDate: {
                    type: String,
                },
                subscriptionEndDate: {
                    type: String,
                },
            },
        ],
        passwordResetToken: {
            type: String,
            default: null,
        },
        passwordResetTokenExpiry: {
            type: Date,
            default: null,
        },
        googleId: {
            type: String,
            default: null,
        },
        isGoogleUser: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;
