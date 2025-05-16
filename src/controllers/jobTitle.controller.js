import db from "../models/index.js";
const JobTitle = db.JobTitle;

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { job_title, job_description, active_status } = req.body;
    const job = await JobTitle.create({ job_title, job_description, active_status });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobTitle.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

// Get single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await JobTitle.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};

// Update job
export const updateJob = async (req, res) => {
  try {
    const { job_title, job_description, active_status } = req.body;
    const [updated] = await JobTitle.update(
      { job_title, job_description, active_status },
      { where: { id: req.params.id } }
    );
    if (!updated) return res.status(404).json({ message: "Job not found" });
    const updatedJob = await JobTitle.findByPk(req.params.id);
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const deleted = await JobTitle.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};
