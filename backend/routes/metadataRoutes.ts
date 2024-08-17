import { Router } from 'express';
import { fetchMetadataController } from '../controller/metadataController';

const router = Router();

// Define the POST route for fetching metadata (can be called from the form)
router.post('/fetch-metadata', fetchMetadataController);
export default router;
