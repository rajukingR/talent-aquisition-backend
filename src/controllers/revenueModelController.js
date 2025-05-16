import db from "../models/index.js";
const RevenueModel = db.RevenueModel;

// Create a new revenue model
export const createRevenueModel = async (req, res) => {
    try {
        const { revenue_model_name, description, active_status } = req.body;

        const newModel = await RevenueModel.create({
            revenue_model_name,
            description,
            active_status,
        });

        res.status(201).json(newModel);
    } catch (error) {
        res.status(500).json({ message: "Error creating revenue model", error });
    }
};

// Get all revenue models
export const getAllRevenueModels = async (req, res) => {
    try {
        const models = await RevenueModel.findAll();
        res.status(200).json(models);
    } catch (error) {
        res.status(500).json({ message: "Error fetching revenue models", error });
    }
};

// Get single revenue model by ID
export const getRevenueModelById = async (req, res) => {
    try {
        const { id } = req.params;
        const model = await RevenueModel.findByPk(id);

        if (!model) return res.status(404).json({ message: "Model not found" });

        res.status(200).json(model);
    } catch (error) {
        res.status(500).json({ message: "Error fetching model", error });
    }
};

// Update a revenue model
export const updateRevenueModel = async (req, res) => {
    try {
        const { id } = req.params;
        const { revenue_model_name, description, active_status } = req.body;

        const [updated] = await RevenueModel.update(
            { revenue_model_name, description, active_status },
            { where: { id } }
        );

        if (!updated) return res.status(404).json({ message: "Model not found" });

        res.status(200).json({ message: "Model updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating model", error });
    }
};

// Delete a revenue model
export const deleteRevenueModel = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await RevenueModel.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ message: "Model not found" });

        res.status(200).json({ message: "Model deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting model", error });
    }
};
