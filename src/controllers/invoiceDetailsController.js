import db from "../models/index.js";
import { Op } from "sequelize";

const InvoiceDetails = db.InvoiceDetails;

// Create a new invoice
export const createInvoice = async (req, res) => {
  try {
    const {
      invoice_id,
      invoice_date,
      order_id,
      jd_ids,
      start_date,
      end_date,
      company_name,
      contact_person,
      email,
      phone_number,
      payment_type,
      tax_percentage,
      total_amount,
      pincode,
      country,
      state,
      city,
      landmark,
      street,
      job_description
    } = req.body;

    // Check if invoice_id already exists
    const existingInvoice = await InvoiceDetails.findOne({ where: { invoice_id } });

    if (existingInvoice) {
      return res.status(400).json({
        message: "Invoice ID already exists. Please use a different ID.",
      });
    }

    // Create new invoice
    const invoice = await InvoiceDetails.create({
      invoice_id,
      invoice_date,
      order_id,
      jd_ids,
      start_date,
      end_date,
      company_name,
      contact_person,
      email,
      phone_number,
      payment_type,
      tax_percentage,
      total_amount,
      pincode,
      country,
      state,
      city,
      landmark,
      street,
      job_description
    });

    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating invoice", error });
  }
};

// Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceDetails.findAll();
    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching invoices", error });
  }
};

// Get invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await InvoiceDetails.findByPk(id);

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching invoice", error });
  }
};

// Update invoice
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      invoice_id,
      invoice_date,
      order_id,
      jd_ids,
      start_date,
      end_date,
      company_name,
      contact_person,
      email,
      phone_number,
      payment_type,
      tax_percentage,
      total_amount,
      pincode,
      country,
      state,
      city,
      landmark,
      street,
      job_description
    } = req.body;

    // Find invoice by ID
    const invoice = await InvoiceDetails.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Check if invoice_id already exists (excluding current invoice)
    const existingInvoice = await InvoiceDetails.findOne({
      where: {
        invoice_id,
        id: { [Op.ne]: id }
      }
    });

    if (existingInvoice) {
      return res.status(400).json({
        message: "Invoice ID already exists. Please use a different ID.",
      });
    }

    // Update invoice details
    await invoice.update({
      invoice_id,
      invoice_date,
      order_id,
      jd_ids,
      start_date,
      end_date,
      company_name,
      contact_person,
      email,
      phone_number,
      payment_type,
      tax_percentage,
      total_amount,
      pincode,
      country,
      state,
      city,
      landmark,
      street,
      job_description
    });

    res.status(200).json({ message: "Invoice updated successfully", invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating invoice", error });
  }
};

// Delete invoice
export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await InvoiceDetails.findByPk(id);

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    await invoice.destroy();

    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting invoice", error });
  }
};
