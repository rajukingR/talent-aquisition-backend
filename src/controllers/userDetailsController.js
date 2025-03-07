import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import { Op } from "sequelize";

const UserDetails = db.UserDetails;
// Create a new user
export const createUser = async (req, res) => {
  try {
    const {
      role,
      department,
      branch,
      country,
      state,
      city,
      active_status,
      first_name,
      last_name,
      login_id,
      password,
      email,
      phone_number,
      pincode,
      street,
      landmark,
      joining_date,
    } = req.body;

    // Check if email already exists
    const existingEmail = await UserDetails.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }

    // Check if phone number already exists
    const existingPhone = await UserDetails.findOne({ where: { phone_number } });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists. Please use a different number." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserDetails.create({
      role,
      department,
      branch,
      country,
      state,
      city,
      active_status,
      first_name,
      last_name,
      login_id,
      password: hashedPassword,
      email,
      phone_number,
      pincode,
      street,
      landmark,
      joining_date,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserDetails.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserDetails.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      role,
      department,
      branch,
      country,
      state,
      city,
      active_status,
      first_name,
      last_name,
      login_id,
      password,
      email,
      phone_number,
      pincode,
      street,
      landmark,
      joining_date,
    } = req.body;

    const user = await UserDetails.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is already in use by another user
    const existingEmail = await UserDetails.findOne({ where: { email, id: { [Op.ne]: id } } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }

    // Check if phone number is already in use by another user
    const existingPhone = await UserDetails.findOne({ where: { phone_number, id: { [Op.ne]: id } } });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists. Please use a different number." });
    }

    // Hash the new password if provided
    let updatedPassword = user.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Update user details
    await user.update({
      role,
      department,
      branch,
      country,
      state,
      city,
      active_status,
      first_name,
      last_name,
      login_id,
      password: updatedPassword,
      email,
      phone_number,
      pincode,
      street,
      landmark,
      joining_date,
      updatedAt: new Date(), // Set updated timestamp
    });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", error });
  }
};


// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserDetails.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};
