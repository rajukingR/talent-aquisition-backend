import db from "../models/index.js";
import { Op } from "sequelize";

const Department = db.Department;

// Create a new department
export const createDepartment = async (req, res) => {
  try {
    const { department_name, description, active_status } = req.body;

    // Check if department name already exists
    const existingDepartment = await Department.findOne({
      where: { department_name },
    });

    if (existingDepartment) {
      return res
        .status(400)
        .json({
          message:
            "Department name already exists. Please choose a different name.",
        });
    }

    // Create department
    const department = await Department.create({
      department_name,
      description,
      active_status,
    });

    res
      .status(201)
      .json({ message: "Department created successfully", department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating department", error });
  }
};

// Get all departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching departments", error });
  }
};

// Get department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department)
      return res.status(404).json({ message: "Department not found" });

    res.status(200).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching department", error });
  }
};

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_name, description, active_status } = req.body;

    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Check if another department has the same name
    const existingDepartment = await Department.findOne({
      where: {
        department_name,
        id: { [Op.ne]: id }, // Ensure the name is not used by another department
      },
    });

    if (existingDepartment) {
      return res
        .status(400)
        .json({
          message:
            "Department name already exists. Please choose a different name.",
        });
    }

    // Update department
    await department.update({
      department_name,
      description,
      active_status,
    });

    res
      .status(200)
      .json({ message: "Department updated successfully", department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating department", error });
  }
};

// Delete department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department)
      return res.status(404).json({ message: "Department not found" });

    await department.destroy();

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting department", error });
  }
};
