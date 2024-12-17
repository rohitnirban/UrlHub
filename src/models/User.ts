import mongoose, { Schema, Document } from "mongoose";

export interface Subscription extends Document {
    subscriptionStartDate: string;
    subscriptionEndDate: string;
};

export interface User extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isSubscribed: boolean;
    role: string;
    subscription: Subscription[];
};

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
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter a Valid Email Address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        verifyCode: {
            type: String,
            required: [true, "Verification Code is required"],
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true, "Verification Code Expiry is required"],
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
            enum: ['user', 'admin'],
            default: "user",
        },
        subscription: [
            {
                subscriptionStartDate: {
                    type: String,
                },
                subscriptionEndDate: {
                    type: String
                }
            }
        ],
    },
    {
        timestamps: true
    }
);


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;