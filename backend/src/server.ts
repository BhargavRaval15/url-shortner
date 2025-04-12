import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/config';
import authRoutes from './routes/auth';
import urlRoutes from './routes/urls';
import { setupDefaultUser } from './controllers/authController';
import { redirectToUrl } from './controllers/urlController';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);

// Root route for the frontend
app.get('/', (req, res) => {
    res.redirect(config.frontendUrl);
});

// Short URL redirection route - must be after all other routes
app.get('/:shortCode', (req, res, next) => {
    if (req.params.shortCode === 'api' || req.params.shortCode === 'favicon.ico') {
        return next();
    }
    redirectToUrl(req, res);
});

// MongoDB connection with retry logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await mongoose.connect(config.mongoUri);
            console.log('Connected to MongoDB');
            // Create default user
            await setupDefaultUser();
            return;
        } catch (error: any) {
            console.error(`MongoDB connection attempt ${i + 1} failed:`, error.message);
            if (i === retries - 1) {
                console.error('All connection attempts failed. Exiting...');
                process.exit(1);
            }
            console.log(`Retrying in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

// Start server only after attempting MongoDB connection
const startServer = async () => {
    try {
        await connectWithRetry();
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
            console.log(`MongoDB URI: ${config.mongoUri}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 