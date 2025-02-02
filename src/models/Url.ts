import mongoose, { Schema, Document } from "mongoose";

// Define the Url interface that extends mongoose.Document
export interface Url extends Document {
    originalUrl: string;
    metaDescription: string;
    metaImageUrl: string;
    shortUrl: string;
    urlId: string;
    isUrlExpiry: boolean;
    urlExpiry?: Date;
    isPasswordProtected: boolean;
    password?: string;
    title: string;
    icon: string;
    user: mongoose.Schema.Types.ObjectId;
    totalClicks: number;
    tags: string[];
    status: string;
    clickDetails: Array<{
        country: string;
        city: string;
        device: string;
        browser: string;
        os: string;
        referrer: string;
        timestamp: Date;
    }>;
    statistics: {
        country: Array<{ name: string; clicks: number }>;
        city: Array<{ name: string; clicks: number }>;
        device: Array<{ name: string; clicks: number }>;
        browser: Array<{ name: string; clicks: number }>;
        os: Array<{ name: string; clicks: number }>;
        referrer: Array<{ name: string; clicks: number }>;
    };
}

// Define the UrlSchema with the optimized structure
const UrlSchema: Schema<Url> = new Schema(
    {
        originalUrl: {
            type: String,
            required: [true, "Original Url is required"],
            unique: true,
        },
        metaDescription: {
            type: String,
        },
        metaImageUrl: {
            type: String,
        },
        shortUrl: {
            type: String,
            required: [true, "Short Url is required"],
            unique: true,
        },
        urlId: {
            type: String,
            required: [true, "Url ID is required"],
            unique: true,
            maxlength: 12,
        },
        isUrlExpiry: {
            type: Boolean,
            default: false
        },
        urlExpiry: {
            type: Date,
            required: [function (this: Url) { return this.isUrlExpiry; }, "Url Expiry is requied"],
        },
        isPasswordProtected: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: [function (this: Url) { return this.isPasswordProtected; }, "Password is required"]
        },
        title: {
            type: String,
            required: [true, "Url Title is required"],
            trim: true,
        },
        icon: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/7046/7046086.png",
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "User is required"]
        },
        totalClicks: {
            type: Number,
            default: 0,
        },
        tags: [String],
        status: {
            type: String,
            enum: ['active', 'archived'],
            default: 'active'
        },
        clickDetails: [
            {
                country: { type: String, required: true },
                city: { type: String, required: true },
                device: { type: String, required: true },
                browser: { type: String, required: true },
                os: { type: String, required: true },
                referrer: { type: String, required: true },
                timestamp: { type: Date, required: true },
            },
        ],
        statistics: {
            country: [{ name: String, clicks: { type: Number, default: 0 } }],
            city: [{ name: String, clicks: { type: Number, default: 0 } }],
            device: [{ name: String, clicks: { type: Number, default: 0 } }],
            browser: [{ name: String, clicks: { type: Number, default: 0 } }],
            os: [{ name: String, clicks: { type: Number, default: 0 } }],
            referrer: [{ name: String, clicks: { type: Number, default: 0 } }],
        }
    },
    {
        timestamps: true
    }
);

const UrlModel = mongoose.models.Url as mongoose.Model<Url> || mongoose.model<Url>("Url", UrlSchema);

export default UrlModel;
