import db from '../models/index.js';

const ExperienceRange = db.ExperienceRange;

// Create a new experience range
export const createExperienceRange = async (req, res) => {
  try {
    const { experience_range, description, active_status } = req.body;

    const experience = await ExperienceRange.create({
      experience_range,
      description,
      active_status,
    });

    res.status(201).json({ message: "Experience range created successfully", experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating experience range", error });
  }
};

// Get all experience ranges
export const getAllExperienceRanges = async (req, res) => {
  try {
    const experiences = await ExperienceRange.findAll();
    res.status(200).json(experiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching experience ranges", error });
  }
};

// Get experience range by ID
export const getExperienceRangeById = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await ExperienceRange.findByPk(id);

    if (!experience) return res.status(404).json({ message: "Experience range not found" });

    res.status(200).json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching experience range", error });
  }
};

// Update experience range
export const updateExperienceRange = async (req, res) => {
  try {
    const { id } = req.params;
    const { experience_range, description, active_status } = req.body;

    const experience = await ExperienceRange.findByPk(id);

    if (!experience) return res.status(404).json({ message: "Experience range not found" });

    await experience.update({
      experience_range,
      description,
      active_status,
    });

    res.status(200).json({ message: "Experience range updated successfully", experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating experience range", error });
  }
};

// Delete experience range
export const deleteExperienceRange = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await ExperienceRange.findByPk(id);

    if (!experience) return res.status(404).json({ message: "Experience range not found" });

    await experience.destroy();

    res.status(200).json({ message: "Experience range deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting experience range", error });
  }
};
