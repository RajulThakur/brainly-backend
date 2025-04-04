import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { BASE_URL, corsOptions } from './config/Config';
import { connectDB } from './config/Database';
import authRoutes from './routes/auth.routes';
import contentRoutes from './routes/content.routes';
import shareRoutes from './routes/share.routes';
dotenv.config();

//Middleware
const app = express();

// CORS should be before other middleware
app.use(cors(corsOptions));

// Security headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.use(cookieParser());

//Connection to MongoDB
connectDB();

//Routes
app.use(`${BASE_URL}/test`, (req, res) => {
  res.json({status:true,message:"You are connected"});
  console.log('You are connected');
});

//Public Routes
app.use(`${BASE_URL}`, authRoutes);
app.use(`${BASE_URL}/brain`, shareRoutes);

//Protected Routes
app.use(`${BASE_URL}`, contentRoutes);


//Server
app.listen(process.env.PORT, () => {
  console.log('Starting...');
  console.log(`App Started - http://localhost:${process.env.PORT}`);
});
