import express from 'express';
import {
  createExperienceRange,
  getAllExperienceRanges,
  getExperienceRangeById,
  updateExperienceRange,
  deleteExperienceRange,
} from '../controllers/ExperienceRangeController.js';

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/create', createExperienceRange);
router.get('/',authMiddleware, getAllExperienceRanges);
router.get('/:id', getExperienceRangeById);
router.put('/:id', updateExperienceRange);
router.delete('/:id', deleteExperienceRange);

export default router;
