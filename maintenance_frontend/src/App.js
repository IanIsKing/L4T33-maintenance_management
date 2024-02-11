// Main App component
// This app makes use of react-bootstrap
// It uses reusable components to display a list of jobs and a modal to create or update jobs, these can be found in components.
// It also has utils to help with date formatting and search filtering.
import React, { useState } from "react";
import ListJobs from "./components/ListJobs";
import AppModal from "./components/Modal";
import Button from "react-bootstrap/Button";
import AlertMessage from "./components/AlertMessage";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

function App() {
  // State to manage alert message
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });
  // State to manage modal
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "",
    job: null,
  });

  // Functions to show modal or alert
  const showModal = (type, job = null) => {
    setModalConfig({
      show: true,
      type,
      job,
    });
  };

  const handleShowAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
  };

  // Functions to hide modal or alert
  const hideModal = () => {
    setModalConfig(() => ({ show: false, job: null, type: "" }));
  };

  const hideAlert = () => {
    setAlert({ show: false, message: "", variant: "" });
    console.log("hideAlert");
  };

  return (
    <div className="App">
      <br />
      {alert.show && (
        <AlertMessage
          show={alert.show}
          Message={alert.message}
          Variant={alert.variant}
          hideAlert={hideAlert}
        />
      )}
      <Container>
        <Row className="header">
          <Col>
            <h1>My Maintenance App</h1>
          </Col>
        </Row>
        <Row className="body">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button
              className="btn btn-primary me-md-2"
              onClick={() => showModal("create_job")}
            >
              Add Job
            </Button>
            <Button
              className="btn btn-primary me-md-2"
              onClick={() => showModal("batch_update")}
            >
              Batch Update
            </Button>
          </div>
          <Col>
            <ListJobs showModal={showModal} modalConfig={modalConfig} />
            <AppModal
              modalConfig={modalConfig}
              onHide={hideModal}
              onAlert={handleShowAlert}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
