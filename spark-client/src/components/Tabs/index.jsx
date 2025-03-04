import PropTypes from "prop-types";
import "./index.css";
import { Icon } from "@iconify/react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="spark-mobile-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`spark-mobile-tab ${activeTab === tab.value ? "active" : ""}`}
          onClick={() => setActiveTab(tab.value)}
        >
        {tab?.icon && <Icon icon={tab.icon} height={24} width={24} />}
        {tab.label}
        </button>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

export default Tabs;