// This file contains the functions that make requests to the backend API

// Create a new job
export const createJob = async (jobData) => {
  const response = await fetch(`/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  return response.json();
};

// Get a all the jobs, or filter by status or archived
export const listJobs = async (showArchived) => {
  const response = await fetch(`/jobs?showArchived=${showArchived}`);
  return response.json();
};

// update a job
export const updateJob = async (jobData) => {
  const response = await fetch(`/jobs/${jobData._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  return response.json();
};

// Update multiple jobs at once
export const batchUpdateJobs = async (jobData) => {
  console.log("jobData", jobData);
  const response = await fetch(`/jobs/batchUpdate`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  console.log("response", response);
  return response.json();
};

// Archive a job
export const archiveJob = async (jobId) => {
  const response = await fetch(`/jobs/archive/${jobId}`, {
    method: "PATCH",
  });
  return response.json();
};
