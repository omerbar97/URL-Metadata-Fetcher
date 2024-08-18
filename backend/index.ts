import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from "dotenv";
import path from 'path';

// loading env
dotenv.config();

// importing the routes
import metadataRoutes from '@src/routes/metadataRoutes'

// Creating the app instance
const app = express();
// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, './public')));

// defining the middleware's
const WEB_URL = process.env.MODE === "PRODUCTION" ? process.env.VITE_SERVER_URL : "http://localhost:3000/"
app.use(express.json()); 
app.use(cors({
  origin: WEB_URL,
  methods:['GET', 'POST']
})); 
app.use(helmet());

// defining the rate limit: max request 5 in timeframe of 1 seconds (1000ms)
const limiter = rateLimit({
  windowMs: 1000, 
  max: 5,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Defining app routes
app.use('/fetch-metadata', metadataRoutes);

app.get('/test', (_req, res) => {
  res.send('Hey this is my API running 🥳 TESTING')
})

// Error handling middleware
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
});

// starting the server
const mode = process.env.MODE
const PORT = mode !== 'PRODUCTION' ? 3000 : 443;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} Web url ${WEB_URL}`);
});

module.exports = app;