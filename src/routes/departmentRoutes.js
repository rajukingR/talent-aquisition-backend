import express from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from '../controllers/DepartmentController.js';

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/create', createDepartment);
router.get('/',authMiddleware, getAllDepartments); 
router.get('/:id', getDepartmentById); 
router.put('/:id', updateDepartment); 
router.delete('/:id', deleteDepartment);

export default router;
