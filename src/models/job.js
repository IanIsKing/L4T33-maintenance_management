// job schema and model
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Submitted", "In Progress", "Completed"],
    default: "Submitted",
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
