import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./index.css"; // Import CSS
import { Icon } from "@iconify/react";

const Toast = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={`toast ${type === "success" ? "toast-success" : "toast-error"}`}>
      {type === "success" ? <Icon icon="gg:check-o" height={24} width={24} /> : <Icon icon="stash:exclamation-triangle" height={24} width={24} />}
      <span>{message}</span>
      <button className="close-btn" onClick={() => setVisible(false)}>
        <Icon icon="maki:cross" height={12} width={12} />
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
