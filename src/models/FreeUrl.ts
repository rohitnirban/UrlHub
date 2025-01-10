import mongoose, { Schema, Document } from "mongoose";

export interface FreeUrl extends Document {
    originalUrl: string;
    shortUrl: string;
    urlId: string;
    isFree: boolean;
}

const FreeUrlSchema: Schema<FreeUrl> = new Schema(
    {
        originalUrl: {
            type: String,
            required: [true, "Original Url is required"],
            unique: true,
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
        isFree: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true
    }
);

const FreeUrlModel = mongoose.models.FreeUrl as mongoose.Model<FreeUrl> || mongoose.model<FreeUrl>("FreeUrl", FreeUrlSchema);

export default FreeUrlModel;
