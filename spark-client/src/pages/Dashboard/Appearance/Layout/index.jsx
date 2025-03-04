import PropTypes from "prop-types";
import "./index.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const layouts = [
  { value: "STACK", label: "Stack", icon: "mdi:hamburger-menu" },
  { value: "GRID", label: "Grid", icon: "mdi:view-grid" },
  { value: "CAROUSEL", label: "Carousel", icon: "mdi:view-carousel" },
];

export default function Layout({ user, setUser }) {
  const handleChange = (e) => {
    const { value } = e.target;
    setUser({ ...user, userTheme: { ...user.userTheme, layoutType: value } });
  };
  return (
    <div className="box-wrapper">
      <h3>Layout</h3>
      <div className="box">
        <div className="layout-options">
          {layouts?.map((layout) => (
            <div
              key={layout.value}
              onClick={() => handleChange({ target: { value: layout.value } })}>
              <div
                className={`layout-option ${
                  user?.userTheme.layoutType === layout.value ? "selected" : ""
                }`}
                onClick={() => handleChange(layout)}>
                <Icon icon={layout.icon} height={48} width={48} />
              </div>
              <label>{layout.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};
