import db from "../models/index.js";
import { Op } from "sequelize";

const ClientDetails = db.ClientDetails;

// Create a new client
export const createClient = async (req, res) => {
  try {
    const { client_id, date, industry, company_name, first_name, last_name, email, phone_number, 
            pincode, country, state, city, street, landmark, source, parent_client, fax, website, 
            active_status } = req.body;

    // Check if client_id already exists
    const existingClient = await ClientDetails.findOne({ where: { client_id } });

    if (existingClient) {
      return res.status(400).json({ message: "Client ID already exists. Please use a different ID." });
    }

    // Create client
    const client = await ClientDetails.create({
      client_id,
      date,
      industry,
      company_name,
      first_name,
      last_name,
      email,
      phone_number,
      pincode,
      country,
      state,
      city,
      street,
      landmark,
      source,
      parent_client,
      fax,
      website,
      active_status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: "Client created successfully", client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating client", error });
  }
};

// Get all clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await ClientDetails.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching clients", error });
  }
};

// Get client by ID
export const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await ClientDetails.findByPk(id);

    if (!client) return res.status(404).json({ message: "Client not found" });

    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching client", error });
  }
};

// Update client
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, date, industry, company_name, first_name, last_name, email, phone_number, 
            pincode, country, state, city, street, landmark, source, parent_client, fax, website, 
            active_status } = req.body;

    const client = await ClientDetails.findByPk(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    // Check if another client has the same client_id
    const existingClient = await ClientDetails.findOne({
      where: { client_id, id: { [Op.ne]: id } }, // Exclude current client
    });

    if (existingClient) {
      return res.status(400).json({ message: "Client ID already exists. Please use a different ID." });
    }

    // Update client
    await client.update({
      client_id,
      date,
      industry,
      company_name,
      first_name,
      last_name,
      email,
      phone_number,
      pincode,
      country,
      state,
      city,
      street,
      landmark,
      source,
      parent_client,
      fax,
      website,
      active_status,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Client updated successfully", client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating client", error });
  }
};

// Delete client
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await ClientDetails.findByPk(id);

    if (!client) return res.status(404).json({ message: "Client not found" });

    await client.destroy();

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting client", error });
  }
};
