"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMetadataController = void 0;
const metadataFetcher_1 = require("@src/services/metadataFetcher");
const fetchMetadataController = async (req, res, next) => {
    try {
        const { urls } = req.body;
        if (!urls || !Array.isArray(urls) || urls.length < 3) {
            return res.status(400).json({ message: 'Please provide at least 3 URLs.' });
        }
        const metadataResults = await (0, metadataFetcher_1.fetchMetadata)(urls);
        res.json(metadataResults);
    }
    catch (error) {
        next(error);
    }
    return;
};
exports.fetchMetadataController = fetchMetadataController;
