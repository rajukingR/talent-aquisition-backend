import db from "../models/index.js";
import { Op } from "sequelize";

const AccountDetails = db.AccountDetails;

// Create a new account detail entry
export const createAccountDetail = async (req, res) => {
  try {
    const {
      month,
      candidate_id,
      candidate_name,
      candidate_type,
      doj,
      title_designation,
      company,
      department,
      category,
      vertical_head,
      client,
      project_client_start_date,
      location,
      total_ctc,
      salary,
      professional_charges,
      billing_amount,
      gm_percentage,
      remarks,
      sub_department,
      revenue_mode,
      billable_non_billable,
      reporting_manager,
      po_end,
    } = req.body;

    // Create new account detail entry
    const accountDetail = await AccountDetails.create({
      month,
      candidate_id,
      candidate_name,
      candidate_type,
      doj,
      title_designation,
      company,
      department,
      category,
      vertical_head,
      client,
      project_client_start_date,
      location,
      total_ctc,
      salary,
      professional_charges,
      billing_amount,
      gm_percentage,
      remarks,
      sub_department,
      revenue_mode,
      billable_non_billable,
      reporting_manager,
      po_end,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: "Account detail created successfully", accountDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating account detail", error });
  }
};

// Get all account details
export const getAllAccountDetails = async (req, res) => {
  try {
    const accountDetails = await AccountDetails.findAll();
    res.status(200).json(accountDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching account details", error });
  }
};

// Get account detail by ID
export const getAccountDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const accountDetail = await AccountDetails.findByPk(id);

    if (!accountDetail) return res.status(404).json({ message: "Account detail not found" });

    res.status(200).json(accountDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching account detail", error });
  }
};

// Update account detail
export const updateAccountDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      month,
      candidate_id,
      candidate_name,
      candidate_type,
      doj,
      title_designation,
      company,
      department,
      category,
      vertical_head,
      client,
      project_client_start_date,
      location,
      total_ctc,
      salary,
      professional_charges,
      billing_amount,
      gm_percentage,
      remarks,
      sub_department,
      revenue_mode,
      billable_non_billable,
      reporting_manager,
      po_end,
    } = req.body;

    const accountDetail = await AccountDetails.findByPk(id);
    if (!accountDetail) return res.status(404).json({ message: "Account detail not found" });

    // Update account detail
    await accountDetail.update({
      month,
      candidate_id,
      candidate_name,
      candidate_type,
      doj,
      title_designation,
      company,
      department,
      category,
      vertical_head,
      client,
      project_client_start_date,
      location,
      total_ctc,
      salary,
      professional_charges,
      billing_amount,
      gm_percentage,
      remarks,
      sub_department,
      revenue_mode,
      billable_non_billable,
      reporting_manager,
      po_end,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Account detail updated successfully", accountDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating account detail", error });
  }
};

// Delete account detail
export const deleteAccountDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const accountDetail = await AccountDetails.findByPk(id);

    if (!accountDetail) return res.status(404).json({ message: "Account detail not found" });

    await accountDetail.destroy();

    res.status(200).json({ message: "Account detail deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting account detail", error });
  }
};
