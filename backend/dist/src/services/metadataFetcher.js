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
exports.fetchMetadata = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
function prefixHttps(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
    }
    return url;
}
const fetchMetadata = async (urls) => {
    const metadataResults = await Promise.all(urls.map(async (url) => {
        try {
            console.log("Requesting site: ", url);
            const { data } = await axios_1.default.get(prefixHttps(url));
            const $ = cheerio.load(data);
            const title = $('head title').text();
            const description = $('meta[name="description"]').attr('content') || 'No description available';
            const image = $('meta[property="og:image"]').attr('content') || '';
            return { title, description, image, isFailed: false, url: url };
        }
        catch (error) {
            console.log("Failed to get information for: ", url);
            return { title: 'Failed to fetch', description: 'Error retrieving metadata', image: '', isFailed: true, url: url };
        }
    }));
    return metadataResults;
};
exports.fetchMetadata = fetchMetadata;
