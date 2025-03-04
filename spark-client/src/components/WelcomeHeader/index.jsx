import PropTypes from "prop-types";
import "./index.css";
import { Icon } from "@iconify/react";
import { clearToken } from "../../service/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function WelcomeHeader({ user, generateShareLink }) {
  const navigate = useNavigate();

  return (
    <div className="welcome-header">
      <div className="welcome-message">
        <h2>
          Hi,{" "}
          <span>
            {user?.firstName}&nbsp;{user?.lastName}
          </span>
        </h2>
        <p className="light">
          Congratulations . You got a great response today.
        </p>
      </div>
      <div className="welcome-action-buttons">
        <button className="btn-white" onClick={generateShareLink}>
          <Icon icon="material-symbols:share" />
          Share
        </button>
        <button
          className="btn-white"
          onClick={() => {
            clearToken();
            navigate("/login");
          }}>
          <Icon icon="mdi-light:logout" />
          Logout
        </button>
      </div>
    </div>
  );
}

WelcomeHeader.propTypes = {
  user: PropTypes.object.isRequired,
  generateShareLink: PropTypes.func.isRequired
};
