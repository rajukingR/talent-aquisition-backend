import db from "../models/index.js";
import { Op } from "sequelize";

const Vendor = db.Vendor;

// Create a new vendor
export const createVendor = async (req, res) => {
  try {
    const {
      vendor_id,
      vendor_name,
      vendor_owner,
      contact_name,
      website,
      phone_number,
      email,
      address_line1,
      pin_code,
      country,
      state,
      city,
      comments,
    } = req.body;

    // Check if vendor_name already exists
    const existingVendor = await Vendor.findOne({ where: { vendor_name } });

    if (existingVendor) {
      return res.status(400).json({
        message: "Vendor name already exists. Please choose a different name.",
      });
    }

    // Check if phone_number or email already exists
    const existingPhone = await Vendor.findOne({ where: { phone_number } });
    const existingEmail = await Vendor.findOne({ where: { email } });

    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number already exists. Please use a different number.",
      });
    }

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    }

    // Create new vendor if name, phone, and email are unique
    const vendor = await Vendor.create({
      vendor_id,
      vendor_name,
      vendor_owner,
      contact_name,
      website,
      phone_number,
      email,
      address_line1,
      pin_code,
      country,
      state,
      city,
      comments,
    });

    res.status(201).json({ message: "Vendor created successfully", vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating vendor", error });
  }
};

// Get all vendors
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.status(200).json(vendors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching vendors", error });
  }
};

// Get vendor by ID
export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByPk(id);

    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching vendor", error });
  }
};

// Update vendor
export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      vendor_id,
      vendor_name,
      vendor_owner,
      contact_name,
      website,
      phone_number,
      email,
      address_line1,
      pin_code,
      country,
      state,
      city,
      comments,
    } = req.body;

    // Find the vendor by ID
    const vendor = await Vendor.findByPk(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Check if vendor_name already exists (excluding the current vendor)
    const existingVendor = await Vendor.findOne({
      where: {
        vendor_name,
        id: { [Op.ne]: id },
      },
    });

    if (existingVendor) {
      return res.status(400).json({
        message: "Vendor name already exists. Please choose a different name.",
      });
    }

    // Check if phone_number or email already exists (excluding the current vendor)
    const existingPhone = await Vendor.findOne({
      where: {
        phone_number,
        id: { [Op.ne]: id },
      },
    });

    const existingEmail = await Vendor.findOne({
      where: {
        email,
        id: { [Op.ne]: id },
      },
    });

    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number already exists. Please use a different number.",
      });
    }

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    }

    // Update the vendor details
    await vendor.update({
      vendor_id,
      vendor_name,
      vendor_owner,
      contact_name,
      website,
      phone_number,
      email,
      address_line1,
      pin_code,
      country,
      state,
      city,
      comments,
    });

    res.status(200).json({ message: "Vendor updated successfully", vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating vendor", error });
  }
};

// Delete vendor
export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByPk(id);

    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    await vendor.destroy();

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting vendor", error });
  }
};
