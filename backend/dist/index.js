"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config();
const metadataRoutes_1 = __importDefault(require("@src/routes/metadataRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
const WEB_URL = process.env.MODE === "PRODUCTION" ? process.env.VITE_SERVER_URL : "http://localhost:3000/";
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: WEB_URL,
    methods: ['GET', 'POST']
}));
app.use((0, helmet_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1000,
    max: 5,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
app.use('/fetch-metadata', metadataRoutes_1.default);
app.get('/test', (_req, res) => {
    res.send('Hey this is my API running 🥳 TESTING');
});
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
});
const mode = process.env.MODE;
const PORT = mode !== 'PRODUCTION' ? 3000 : 443;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} Web url ${WEB_URL}`);
});
module.exports = app;
