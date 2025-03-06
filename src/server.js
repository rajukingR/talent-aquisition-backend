import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import db from './config/db.js';
import parentRouter from './routes/parentRouter.js';
import userDetailsRoutes from "../src/routes/userDetailsRoutes.js";


dotenv.config();

const app = express();

//**  Middlewares **//
app.use(express.json()); // Parse JSON
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(helmet()); // Security



app.use('/api', parentRouter)
app.use("/api/users", userDetailsRoutes); // API base path

//** Database connection check **//
db.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection failed:', err));

//** Start server **//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
