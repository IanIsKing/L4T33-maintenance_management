// Update jobs or arhive jobs
import React, { useState } from "react";
import { updateJob } from "../api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UpdateJobForm({ modalConfig, onHide, onAlert }) {
  // set the job data to be updated from the modalConfig prop
  const job = modalConfig.job;
  // State to manage the form data for updating a job, this will also prefill the form with the job data
  const [jobData, setJobData] = useState({
    description: job.description,
    location: job.location,
    priority: job.priority,
    status: job.status,
    archived: job.archived,
    dateSubmitted: job.dateSubmitted,
    _id: job._id,
  });

  // Function to handle the form submission and return a message to alert the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateJob(jobData);
      onHide();
      onAlert(response.message, response.variant);
    } catch (error) {
      onHide();
      onAlert(error, "danger");
      console.error({ message: error, variant: "danger" });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="container mt-3">
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={jobData.description}
          onChange={(e) =>
            setJobData({ ...jobData, description: e.target.value })
          }
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter location"
          value={jobData.location}
          onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="priority">
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          value={jobData.priority}
          onChange={(e) => setJobData({ ...jobData, priority: e.target.value })}
          required
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={jobData.status}
          onChange={(e) => setJobData({ ...jobData, status: e.target.value })}
          required
        >
          <option>Submitted</option>
          <option>In Progress</option>
          <option>Completed</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="archived">
        <Form.Check
          type="checkbox"
          label="Archived"
          checked={jobData.archived}
          onChange={(e) =>
            setJobData({ ...jobData, archived: e.target.checked })
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdateJobForm;
