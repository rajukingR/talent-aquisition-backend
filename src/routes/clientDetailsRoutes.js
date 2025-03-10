import express from "express";
import {
    createClient  ,
    getAllClients  ,
    getClientById  ,
    updateClient ,
    deleteClient  ,
  } from "../controllers/clientDetailsController.js";  
  
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", createClient  );
router.get("/", getAllClients  );
router.get("/:id", getClientById  );
router.put("/:id", updateClient );
router.delete("/:id", deleteClient  );

export default router;
