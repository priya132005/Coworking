import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import router from './Routes/indexs.js';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const cors=require('cors');
// Middleware
app.use(cors({
  origin:'http://localhost:5173' ,
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api', router);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
