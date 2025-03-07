import db from "../models/index.js";
import { Op } from "sequelize";

const Branch = db.Branch;

// Create a new branch
export const createBranch = async (req, res) => {
  try {
    const {
      branch_id,
      branch_name,
      pincode,
      country,
      state,
      city,
      address,
      active_status,
    } = req.body;

    // Check if branch_name already exists
    const existingBranch = await Branch.findOne({ where: { branch_name } });

    if (existingBranch) {
      return res
        .status(400)
        .json({
          message:
            "Branch name already exists. Please choose a different name.",
        });
    }

    // Create new branch if name is unique
    const branch = await Branch.create({
      branch_id,
      branch_name,
      pincode,
      country,
      state,
      city,
      address,
      active_status,
    });

    res.status(201).json({ message: "Branch created successfully", branch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating branch", error });
  }
};

// Get all branches
export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching branches", error });
  }
};

// Get branch by ID
export const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findByPk(id);

    if (!branch) return res.status(404).json({ message: "Branch not found" });

    res.status(200).json(branch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching branch", error });
  }
};

// Update branch
export const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      branch_id,
      branch_name,
      pincode,
      country,
      state,
      city,
      address,
      active_status,
    } = req.body;

    // Find the branch by ID
    const branch = await Branch.findByPk(id);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    // Check if branch_name already exists (excluding the current branch)
    const existingBranch = await Branch.findOne({
      where: {
        branch_name,
        id: { [Op.ne]: id }, // Correct usage of Op.ne
      },
    });

    if (existingBranch) {
      return res
        .status(400)
        .json({
          message:
            "Branch name already exists. Please choose a different name.",
        });
    }

    // Update the branch details
    await branch.update({
      branch_id,
      branch_name,
      pincode,
      country,
      state,
      city,
      address,
      active_status,
    });

    res.status(200).json({ message: "Branch updated successfully", branch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating branch", error });
  }
};

// Delete branch
export const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findByPk(id);

    if (!branch) return res.status(404).json({ message: "Branch not found" });

    await branch.destroy();

    res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting branch", error });
  }
};
