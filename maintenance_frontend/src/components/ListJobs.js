// List all jobs in a table and allow the user to search, sort, and select jobs to update
// This component is used on the main view and reused again to update multiple jobs at once.
import React, { useEffect, useState } from "react";
import { listJobs } from "../api";
import JobsTable from "./JobsTable";
import Form from "react-bootstrap/Form";
import "../App.css";
import { useTableSearch } from "../Utils/useTableSearch";
import { Row, Col } from "react-bootstrap";
import BasicSpinner from "./Spinner";

export default function ListJobs({ showModal, modalConfig, setSelection }) {
  // State to manage the jobs data and the show archived checkbox
  const [jobs, setJobs] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [searchVal, setSearchVal] = useState(null);
  const { filteredData, loading } = useTableSearch({
    searchVal,
    jobs,
  });

  // Fetch the jobs data from the back end and set the jobs state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listJobs(showArchived);
        setJobs(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [showArchived, modalConfig]);

  // Function to handle the checkbox change event and set the showArchived state
  const handleCheckboxChange = (event) => {
    setShowArchived(event.target.checked);
  };

  return (
    <>
      <Row className="mt-2 mb-2">
        <Col>
          <input
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search"
          />
        </Col>
        <Col>{loading && <BasicSpinner />}</Col>

        <Col>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Form.Check
              onChange={handleCheckboxChange}
              type="checkbox"
              label="Show Archived Jobs"
            />
          </div>
        </Col>
      </Row>
      <JobsTable
        jobs={filteredData}
        showModal={showModal}
        modalConfig={modalConfig}
        setSelection={setSelection}
      />
    </>
  );
}
