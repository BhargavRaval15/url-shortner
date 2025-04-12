import mongoose from 'mongoose';

export interface IUrl extends mongoose.Document {
    originalUrl: string;
    shortCode: string;
    userId: mongoose.Types.ObjectId;
    clicks: number;
    expiresAt?: Date;
    createdAt: Date;
}

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    expiresAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

urlSchema.index({ shortCode: 1 });
urlSchema.index({ userId: 1, createdAt: -1 });

export const Url = mongoose.model<IUrl>('Url', urlSchema); 