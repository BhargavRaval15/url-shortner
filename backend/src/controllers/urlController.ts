import { Response } from 'express';
import shortid from 'shortid';
import { AuthRequest } from '../middleware/auth';
import { Url } from '../models/Url';
import { Analytics } from '../models/Analytics';
import UAParser from 'ua-parser-js';

export const createShortUrl = async (req: AuthRequest, res: Response) => {
    try {
        const { originalUrl, customAlias, expiresAt } = req.body;
        const userId = req.user._id;

        // Validate URL
        try {
            new URL(originalUrl);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        // Handle custom alias
        let shortCode = customAlias;
        if (shortCode) {
            const existing = await Url.findOne({ shortCode });
            if (existing) {
                return res.status(400).json({ error: 'Custom alias already in use' });
            }
        } else {
            shortCode = shortid.generate();
        }

        const url = await Url.create({
            originalUrl,
            shortCode,
            userId,
            expiresAt: expiresAt ? new Date(expiresAt) : null
        });

        res.status(201).json(url);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const redirectToUrl = async (req: AuthRequest, res: Response) => {
    try {
        const { shortCode } = req.params;
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        if (url.expiresAt && url.expiresAt < new Date()) {
            return res.status(410).json({ error: 'URL has expired' });
        }

        // Update click count
        url.clicks += 1;
        await url.save();

        // Log analytics asynchronously
        const ua = new UAParser(req.headers['user-agent']);
        const analytics = {
            urlId: url._id,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || '',
            device: ua.getDevice().type || 'unknown',
            browser: ua.getBrowser().name || 'unknown',
            os: ua.getOS().name || 'unknown'
        };

        Analytics.create(analytics).catch(console.error);

        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getUserUrls = async (req: AuthRequest, res: Response) => {
    try {
        const { page = 1, limit = 5, search = '' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const query: any = { userId: req.user._id };
        
        if (search) {
            query.$or = [
                { originalUrl: { $regex: search, $options: 'i' } },
                { shortCode: { $regex: search, $options: 'i' } }
            ];
        }

        const [urls, total] = await Promise.all([
            Url.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),
            Url.countDocuments(query)
        ]);

        res.json({
            urls,
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / Number(limit))
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getUrlAnalytics = async (req: AuthRequest, res: Response) => {
    try {
        const { urlId } = req.params;
        const url = await Url.findOne({ _id: urlId, userId: req.user._id });

        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        const analytics = await Analytics.find({ urlId: url._id })
            .sort({ timestamp: -1 });

        // Aggregate analytics data
        const deviceStats = analytics.reduce((acc: any, curr) => {
            acc[curr.device] = (acc[curr.device] || 0) + 1;
            return acc;
        }, {});

        const browserStats = analytics.reduce((acc: any, curr) => {
            acc[curr.browser] = (acc[curr.browser] || 0) + 1;
            return acc;
        }, {});

        const clicksByDay = analytics.reduce((acc: any, curr) => {
            const date = curr.timestamp.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        res.json({
            url,
            totalClicks: url.clicks,
            deviceStats,
            browserStats,
            clicksByDay
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}; 