import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import router from './Routes/indexs.js';
import cookieParser from 'cookie-parser';
import { AuthToken } from './Middleware/AuthToken.js';
import morgan from 'morgan';

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
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api', router);
app.all('*',(req,res)=>{
  res.status(404).send('OOPS!! 404 page not found');
});
app.use(AuthToken);
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;