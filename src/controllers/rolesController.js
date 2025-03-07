import db from "../models/index.js";
import { Op } from "sequelize";

const Role = db.Role;

// Create a new role
export const createRole = async (req, res) => {
  try {
    const { name, department, description, active_status } = req.body;

    // Check if role name already exists within the same tenant
    const existingRole = await Role.findOne({
      where: { name },
    });

    if (existingRole) {
      return res.status(400).json({ message: "Role name already exists for this tenant. Please choose a different name." });
    }

    // Create role with timestamps
    const role = await Role.create({
      name,
      department,
      description,
      active_status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating role", error });
  }
};

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching roles", error });
  }
};

// Get role by ID
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching role", error });
  }
};

// Update role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, description, active_status } = req.body;

    const role = await Role.findByPk(id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    // Check if another role in the same tenant has the same name
    const existingRole = await Role.findOne({
      where: {
        name,
        id: { [Op.ne]: id }, // Exclude current role
      },
    });

    if (existingRole) {
      return res.status(400).json({ message: "Role name already exists for this tenant. Please choose a different name." });
    }

    // Update role with timestamps
    await role.update({
      name,
      department,
      description,
      active_status,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Role updated successfully", role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating role", error });
  }
};

// Delete role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) return res.status(404).json({ message: "Role not found" });

    await role.destroy();

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting role", error });
  }
};
