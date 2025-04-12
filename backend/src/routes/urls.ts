import express from 'express';
import { auth } from '../middleware/auth';
import { 
    createShortUrl, 
    getUserUrls, 
    getUrlAnalytics,
    redirectToUrl 
} from '../controllers/urlController';

const router = express.Router();

// Protected routes
router.post('/', auth, createShortUrl);
router.get('/user', auth, getUserUrls);
router.get('/analytics/:urlId', auth, getUrlAnalytics);

// Public route for redirection
router.get('/:shortCode', redirectToUrl);

export default router; 