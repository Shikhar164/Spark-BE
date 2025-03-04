import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { showToast } from "../components/utils/toastUtils";
import Toast from "../components/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const triggerToast = (message, type) => {
    showToast(setToasts, message, type);
  };

  return (
    <ToastContext.Provider value={triggerToast}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};


ToastProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);

