// Bootstrap Spinner component used when loading data from the back end
import Spinner from "react-bootstrap/Spinner";

function BasicSpinner() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default BasicSpinner;
