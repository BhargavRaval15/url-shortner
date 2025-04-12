"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const analyticsSchema = new mongoose_1.default.Schema({
    urlId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.Analytics = mongoose_1.default.model('Analytics', analyticsSchema);
