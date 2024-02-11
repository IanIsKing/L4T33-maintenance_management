// router for job routes
import express from "express";
import {
  createJob,
  listJobs,
  updateJob,
  batchUpdateJobs,
  archiveJob,
} from "../controllers/jobController.js";

// create a new router
const router = express.Router();

// define the routes
router.get("/", (req, res) => {
  res.send("Welcome to the Job Board API!");
});
router.post("/jobs", createJob);
router.get("/jobs", listJobs);
router.put("/jobs/:id", updateJob);
router.patch("/jobs/batchUpdate", batchUpdateJobs);
router.patch("/jobs/archive/:id", archiveJob);

export default router;
