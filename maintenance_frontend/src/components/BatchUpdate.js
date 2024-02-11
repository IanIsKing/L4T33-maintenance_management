// Batch update component to update multiple jobs at once
// This componet is used to update multiple jobs at once, it uses the ListJobs component to display the
// list of jobs and a form to update the status of the selected jobs.
import React, { useEffect, useState } from "react";
import { batchUpdateJobs } from "../api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListJobs from "./ListJobs";

// BatchUpdate component to update multiple jobs at once
export default function BatchUpdate({ onHide, onAlert, modalConfig }) {
  const [selection, setSelection] = useState([]);
  const [batchData, setBatchData] = useState({
    _ids: selection,
    status: "Low",
  });

  // Function to handle the form submission and pass the message and variant to the parent component
  const handleSubmit = async (e) => {
    console.log(batchData);
    e.preventDefault();
    try {
      const response = await batchUpdateJobs(batchData);
      onHide();
      onAlert(response.message, response.variant);
    } catch (error) {
      onHide();
      onAlert(error, "danger");
      console.error({ message: error, variant: "danger" });
    }
  };

  // Function to handle the selection of jobs to be updated
  const handleSetSelection = (select) => {
    if (select) {
      setSelection([...selection, select]);
    } else {
      setSelection(selection.filter((id) => id !== select));
    }
  };

  // Update the batchData state when the selection changes
  useEffect(() => {
    setBatchData({ ...batchData, _ids: selection });
  }, [selection]);

  return (
    <Form onSubmit={handleSubmit} className="container mt-3">
      <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={batchData.status}
          onChange={(e) =>
            setBatchData({ ...batchData, status: e.target.value })
          }
          required
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </Form.Control>
      </Form.Group>
      <ListJobs modalConfig={modalConfig} setSelection={handleSetSelection} />
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}
