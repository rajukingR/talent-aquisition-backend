import express from "express";
import {
    createRole ,
    getAllRoles ,
    getRoleById ,
    updateRole,
    deleteRole ,
  } from "../controllers/rolesController.js";  
  

const router = express.Router();

router.post("/create", createRole );
router.get("/", getAllRoles );
router.get("/:id", getRoleById );
router.put("/:id", updateRole);
router.delete("/:id", deleteRole );

export default router;
