import { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./index.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImageUrl } from "../utils";

const apps = [
  { id: 1, key: "IN", value: "Instagram" },
  { id: 2, key: "FB", value: "Facebook" },
  { id: 3, key: "TW", value: "X" },
  { id: 4, key: "YT", value: "Youtube" },
];

const Modal = ({ isOpen, onClose, onSubmit, mode }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    type: "",
  });

  if (!isOpen) return null; // Don't render if modal is closed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let linkData, shopData;
    if (mode === "link") {
      linkData = {
        linkTitle: formData.title,
        linkUrl: formData.url,
        linkType: formData.type,
        show: true,
      };
      onSubmit(linkData);
    } else {
      shopData = {
        shopTitle: formData.title,
        shopUrl: formData.url,
        linkType: "OT",
        show: true,
      };
      onSubmit(shopData);
    }

    setFormData({ title: "", url: "", type: "" });
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Enter URL</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              className="spark-input input-special"
              value={formData.title}
              onChange={handleChange}
              placeholder={mode === "link" ? "Link Title 🖊️" : "Shop Title 🖊️"}
              required
            />

            <input
              type="url"
              name="url"
              className="spark-input input-special"
              placeholder={mode === "link" ? "Link Url 🖊️" : "Shop Url 🖊️"}
              value={formData.url}
              onChange={handleChange}
              required
            />
            {mode === "link" && <h3>Applications</h3>}
            {mode === "link" && (
              <div className="apps">
                {apps?.map((app) => {
                  return (
                    <div className="app-item" key={app.id}>
                      <div
                        className={`app-icon ${
                          app.key === formData.type ? "picked" : ""
                        }`}
                        onClick={() =>
                          handleChange({
                            target: { value: app.key, name: "type" },
                          })
                        }>
                        <Icon
                          icon={getImageUrl(app.key)}
                          height={16}
                          width={16}
                        />
                      </div>
                      <label>{app.value}</label>
                    </div>
                  );
                })}
              </div>
            )}
            <button type="submit" className="btn-primary full-width">
              {mode === "link" ? "Add Link" : "Add Shop"}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") // Using React Portal
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  mode: PropTypes.string,
};

export default Modal;
