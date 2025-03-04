import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Retrieve token

  return token ? children : <h2>Access Denied. Please log in. <Link to="/login">Login</Link></h2>;
};

// Define PropTypes
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures element is a valid React node
};

export default ProtectedRoute;
