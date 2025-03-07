import express from 'express';
import {
  createExperienceRange,
  getAllExperienceRanges,
  getExperienceRangeById,
  updateExperienceRange,
  deleteExperienceRange,
} from '../controllers/ExperienceRangeController.js';

const router = express.Router();

router.post('/create', createExperienceRange);
router.get('/', getAllExperienceRanges);
router.get('/:id', getExperienceRangeById);
router.put('/:id', updateExperienceRange);
router.delete('/:id', deleteExperienceRange);

export default router;
