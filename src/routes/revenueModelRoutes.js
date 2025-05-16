import express from "express";
import {
    createRevenueModel,
    getAllRevenueModels,
    getRevenueModelById,
    updateRevenueModel,
    deleteRevenueModel
} from "../controllers/revenueModelController.js";

const router = express.Router();

router.post("/create", createRevenueModel);
router.get("/", getAllRevenueModels);
router.get("/:id", getRevenueModelById);
router.put("/:id", updateRevenueModel);
router.delete("/:id", deleteRevenueModel);

export default router;
