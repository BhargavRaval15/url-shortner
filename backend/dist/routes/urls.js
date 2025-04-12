"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const urlController_1 = require("../controllers/urlController");
const router = express_1.default.Router();
// Protected routes
router.post('/', auth_1.auth, urlController_1.createShortUrl);
router.get('/user', auth_1.auth, urlController_1.getUserUrls);
router.get('/analytics/:urlId', auth_1.auth, urlController_1.getUrlAnalytics);
// Public route for redirection
router.get('/:shortCode', urlController_1.redirectToUrl);
exports.default = router;
