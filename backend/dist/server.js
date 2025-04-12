"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config/config");
const auth_1 = __importDefault(require("./routes/auth"));
const urls_1 = __importDefault(require("./routes/urls"));
const authController_1 = require("./controllers/authController");
const urlController_1 = require("./controllers/urlController");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// API Routes
app.use('/api/auth', auth_1.default);
app.use('/api/urls', urls_1.default);
// Root route for the frontend
app.get('/', (req, res) => {
    res.redirect(config_1.config.frontendUrl);
});
// Short URL redirection route - must be after all other routes
app.get('/:shortCode', (req, res, next) => {
    if (req.params.shortCode === 'api' || req.params.shortCode === 'favicon.ico') {
        return next();
    }
    (0, urlController_1.redirectToUrl)(req, res);
});
// MongoDB connection with retry logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await mongoose_1.default.connect(config_1.config.mongoUri);
            console.log('Connected to MongoDB');
            // Create default user
            await (0, authController_1.setupDefaultUser)();
            return;
        }
        catch (error) {
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
        app.listen(config_1.config.port, () => {
            console.log(`Server is running on port ${config_1.config.port}`);
            console.log(`MongoDB URI: ${config_1.config.mongoUri}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
