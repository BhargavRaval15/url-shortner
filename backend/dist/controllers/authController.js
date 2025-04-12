"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDefaultUser = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const config_1 = require("../config/config");
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, config_1.config.jwtSecret, {
        expiresIn: '7d'
    });
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        res.json({ token, user: { id: user._id, email: user.email } });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.login = login;
// For development purposes only - creates the hardcoded user if it doesn't exist
const setupDefaultUser = async () => {
    try {
        const email = 'intern@dacoid.com';
        const password = 'Test123';
        const existingUser = await User_1.User.findOne({ email });
        if (!existingUser) {
            await User_1.User.create({ email, password });
            console.log('Default user created successfully');
        }
    }
    catch (error) {
        console.error('Error creating default user:', error);
    }
};
exports.setupDefaultUser = setupDefaultUser;
