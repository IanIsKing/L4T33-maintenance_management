// CreateJobForm component to create a new job
import React, { useState } from "react";
import { createJob } from "../api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// CreateJobForm component to create a new job
function CreateJobForm({ onHide, onAlert }) {
  // State to manage the form data for creating a new job
  const [jobData, setJobData] = useState({
    description: "",
    location: "",
    priority: "Low",
  });

  // Function to handle the form submission and return a message to alert the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createJob(jobData);
      onHide();
      console.log({ message: response.message, variant: response.variant });
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateJobForm;
