import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';

// importing the routes
import metadataRoutes from './routes/metadataRoutes';

// Creating the app instance
const app = express();
// All data that will arive will be translated into json object
app.use(express.json()); 
// Cors is for Cross-Orgin (only accepting my site for request)
app.use(cors()); 
app.use(helmet());

// Defining the rate limit: max request 5 in timeframe of 1 seconds (1000ms)
const limiter = rateLimit({
  windowMs: 1000, 
  max: 5,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Defining app routes
app.use('/api/metadata', metadataRoutes);


// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
