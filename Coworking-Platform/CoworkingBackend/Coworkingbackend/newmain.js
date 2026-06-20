import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import router from './Routes/indexs.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// CORS - allow the deployed frontend (FRONTEND_URL) plus local dev origins.
// Multiple comma-separated origins can be provided via FRONTEND_URL.
// ---------------------------------------------------------------------------
const defaultDevOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const configuredOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...configuredOrigins, ...defaultDevOrigins])];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile apps, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded avatar/space images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check (useful for uptime monitors / deployment platforms)
app.get('/', (req, res) => {
  res.json({ message: 'Coworking API is running', success: true });
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', success: true });
});

// Routes
app.use('/api', router);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', error: true, success: false });
});

// Centralized error handler (e.g. multer errors, CORS rejections)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong on the server',
    error: true,
    success: false,
  });
});

// Database connection, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
