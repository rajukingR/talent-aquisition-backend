import express from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  } from "../controllers/userDetailsController.js";  // <-- Ensure `.js` extension
  

const router = express.Router();

router.post("/create", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
