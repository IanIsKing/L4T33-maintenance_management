// This file contains the logic for the job routes
// It is imported into the api.js file and used to define the routes for the job resource
// The job routes are defined in the jobRoutes.js file
// The job routes are then used in the api.js file to define the routes for the job resource
// This server will return a message when it has completed the task and a varient of success or danger depending on the outcome
// The server will also return a message if there is an error and a varient of danger

import Job from "../models/job.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({
      message: newJob.description + " created successfully",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};

// Get a all the jobs, or filter by status or archived
export const listJobs = async (req, res) => {
  const { status } = req.query;
  const showArchived = req.query.showArchived;
  let query = {};
  if (status) {
    query.status = status;
  }
  try {
    if (showArchived === "false") {
      query.archived = false;
    }
    const jobs = await Job.find(query).sort({ status: 1, dateSubmitted: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message, variant: "danger" });
  }
};

// update a job
export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: updatedJob.description + " updated successfully",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};

// Update multiple jobs at once
export const batchUpdateJobs = async (req, res) => {
  try {
    const { _ids, status } = req.body;
    console.log("ids", _ids);
    console.log("status", status);
    const updates = await Job.updateMany(
      { _id: { $in: _ids } },
      { $set: { status: status } }
    );
    res.json({
      message: updates.modifiedCount + " jobs updated",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};

// Delete a job
export const archiveJob = async (req, res) => {
  try {
    const archivedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true }
    );
    res.json({
      message: archivedJob.description + " archived successfully",
      variant: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, variant: "danger" });
  }
};
