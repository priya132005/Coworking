import app from './newmain.js';
import connectDB from './config/db.js';

import {config} from 'dotenv';
config();
const PORT =process.env.PORT ||3000;

app.listen(PORT,async()=>{
    await connectDB();
    console.log(`app is running at http:localhost:${PORT}`);
});