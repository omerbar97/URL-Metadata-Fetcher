import { Request, Response, NextFunction } from 'express';
import { fetchMetadata } from '../services/metadataFetcher';

export const fetchMetadataController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { urls } = req.body;
    // Validate input
    if (!urls || !Array.isArray(urls) || urls.length < 3) {
      return res.status(400).json({ message: 'Please provide at least 3 URLs.' });
    }
    // Fetch metadata using the utility function
    const metadataResults = await fetchMetadata(urls);
    // Send the response
    res.json(metadataResults);
  } catch (error) {
    next(error);
  }
};
