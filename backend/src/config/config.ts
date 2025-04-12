import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/url-shortener',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    baseUrl: process.env.BASE_URL || 'http://localhost:5000',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
}; 