import express from "express";
import {
  createInvoice ,
  getAllInvoices ,
  getInvoiceById ,
  updateInvoice ,
  deleteInvoice ,
} from "../controllers/invoiceDetailsController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", createInvoice);
router.get("/", getAllInvoices);
router.get("/:id", getInvoiceById);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);

export default router;
