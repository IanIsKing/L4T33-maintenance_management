// reusable modal component, this component is reused when creating a job, updating a job, and batch updating jobs.
// The modalConfig prop is passed from the parent component App.js to determine the type of modal to display.
// The onHide and onAlert props are passed from the parent component App.js to handle the modal close and alert messages respectively.
import React from "react";
import { Modal } from "react-bootstrap";
import CreateJobForm from "./CreateJobForm";
import UpdateJobForm from "./UpdateJobForm";
import BatchUpdate from "./BatchUpdate";

function AppModal({ modalConfig, onHide, onAlert }) {
  // Function to render the content of the modal based on the modalConfig type
  const renderContent = () => {
    switch (modalConfig.type) {
      case "create_job":
        return (
          <CreateJobForm
            modalConfig={modalConfig}
            onHide={onHide}
            onAlert={onAlert}
          />
        );
      case "update_job":
        return (
          <UpdateJobForm
            modalConfig={modalConfig}
            onHide={onHide}
            onAlert={onAlert}
          />
        );
      case "batch_update":
        return (
          <BatchUpdate
            modalConfig={modalConfig}
            onHide={onHide}
            onAlert={onAlert}
          />
        );
      default:
        return <p>Invalid modal type</p>;
    }
  };

  return (
    <Modal
      show={modalConfig.show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalConfig.type === "create_job" ? "Add Job" : "Update Job"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderContent()}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default AppModal;
