import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config/config';

const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, config.jwtSecret, {
        expiresIn: '7d'
    });
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// For development purposes only - creates the hardcoded user if it doesn't exist
export const setupDefaultUser = async () => {
    try {
        const email = 'intern@dacoid.com';
        const password = 'Test123';

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            await User.create({ email, password });
            console.log('Default user created successfully');
        }
    } catch (error) {
        console.error('Error creating default user:', error);
    }
}; 