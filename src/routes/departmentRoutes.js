import express from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from '../controllers/DepartmentController.js';

const router = express.Router();

router.post('/create', createDepartment);
router.get('/', getAllDepartments); 
router.get('/:id', getDepartmentById); 
router.put('/:id', updateDepartment); 
router.delete('/:id', deleteDepartment);

export default router;
