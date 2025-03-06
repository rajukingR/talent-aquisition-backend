import db from "../models/index.js";

const Role = db.Role;

// Create a new role
export const createRole = async (req, res) => {
  try {
    const { tenant_id, name, department, description, active_status } = req.body;

    const role = await Role.create({
      tenant_id,
      name,
      department,
      description,
      active_status,
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
    const { tenant_id, name, department, description, active_status } = req.body;

    const role = await Role.findByPk(id);

    if (!role) return res.status(404).json({ message: "Role not found" });

    await role.update({
      tenant_id,
      name,
      department,
      description,
      active_status,
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
