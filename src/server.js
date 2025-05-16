import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import db from './config/db.js';
import parentRouter from './routes/parentRouter.js';
import userDetailsRoutes from "../src/routes/userDetailsRoutes.js";
import roleRoutes from "../src/routes/roleRoutes.js";
import experienceRoutes  from "../src/routes/experienceRoutes.js";
import departmentRoutes from "../src/routes/departmentRoutes.js";
import branchRoutes from "../src/routes/branchRoutes.js";
import vendorRoutes from "../src/routes/vendorRoutes.js"; 
import invoiceDetailsRoutes from "../src/routes/invoiceDetailsRoutes.js"; 
import accountDetailsRoutes from "../src/routes/accountDetailsRoutes.js"; 
import clientDetailsRoutes from "../src/routes/clientDetailsRoutes.js"; 
import workLayoutRoutes from "./routes/workLayoutRoutes.js";
import revenueModelRoutes from "./routes/revenueModelRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import industryroutes from  "./routes/industryroutes.js";

dotenv.config();

const app = express();

//**  Middlewares **//
app.use(express.json()); 
app.use(cors()); 
app.use(morgan('dev'));
app.use(helmet());


app.use('/api', parentRouter)
app.use("/api/users", userDetailsRoutes); 
app.use("/api/roles", roleRoutes);
app.use("/api/experience-range", experienceRoutes); 
app.use("/api/department", departmentRoutes);  
app.use("/api/branch", branchRoutes); 
app.use("/api/vendors", vendorRoutes);  
app.use("/api/invoice-details", invoiceDetailsRoutes);  
app.use("/api/account-details", accountDetailsRoutes);  
app.use("/api/client-details", clientDetailsRoutes);  
app.use("/api/work-layouts", workLayoutRoutes);
app.use("/api/revenue-model", revenueModelRoutes);
app.use("/api/job-title", jobRoutes);
app.use("/api/industries", industryroutes);


db.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection failed:', err));

//** Start server **//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
