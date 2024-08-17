import { Router } from 'express';
import { fetchMetadataController } from '@src/controller/metadataController';

const router = Router();
// Define the POST route for fetching metadata (can be called from the form)
router.post('/', fetchMetadataController);
export default router;
