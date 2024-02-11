// AlertMessage component to display alert messages, the message and varient is passed from the back end with the status code to parent component App.js
import Alert from "react-bootstrap/Alert";

function AlertMessage({ show, Message, Variant, hideAlert }) {
  if (show) {
    return (
      <Alert
        className="ms-3 me-3"
        variant={Variant}
        onClose={() => hideAlert()}
        dismissible
      >
        <Alert.Heading className="text-center">{Message}</Alert.Heading>
      </Alert>
    );
  }
}

export default AlertMessage;
