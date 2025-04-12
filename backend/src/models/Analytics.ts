import mongoose from 'mongoose';

export interface IAnalytics extends mongoose.Document {
    urlId: mongoose.Types.ObjectId;
    timestamp: Date;
    ipAddress: string;
    userAgent: string;
    device: string;
    browser: string;
    os: string;
    country?: string;
    city?: string;
}

const analyticsSchema = new mongoose.Schema({
    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    device: {
        type: String,
        required: true
    },
    browser: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    country: String,
    city: String
});

analyticsSchema.index({ urlId: 1, timestamp: -1 });

export const Analytics = mongoose.model<IAnalytics>('Analytics', analyticsSchema); 