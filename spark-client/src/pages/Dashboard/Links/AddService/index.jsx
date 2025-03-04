import { useState } from "react";
import Tabs from "../../../../components/Tabs";
import "./index.css";
import LinkPreview from "../../../../components/LinkPreview";
import PropTypes from "prop-types";
import Modal from "../../../../components/Modal";

const tabs = [
  { label: "Add Link", value: "link", icon: "solar:shop-outline" },
  { label: "Add Shop", value: "shop", icon: "solar:shop-outline" },
];

export default function AddService({ links, shops, addLink, removeLink, addShop, removeShop }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("link");

  const handleSubmit = (data) => {
    if (activeTab === "link") {
      addLink(data);
    } else {
      addShop(data);
    }
  };

  return (
    <div className="box">
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} mode={activeTab} />
      <div className="add-service">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <button className="btn-primary full-width" onClick={() => setModalOpen(true)}> + Add</button>
        <div className="added-service-list">
          {activeTab === "link" &&
            links?.map((link, idx) => (
              <LinkPreview key={`link-${idx}`} linkData={link} removeLink={removeLink} />
            ))}

          {activeTab === "shop" &&
            shops?.map((shop, idx) => (
              <LinkPreview key={`shop-${idx}`} linkData={shop} removeShop={removeShop} />
            ))}
        </div>
      </div>
    </div>
  );
}

AddService.propTypes = {
  links: PropTypes.array,
  shops: PropTypes.array,
  removeLink: PropTypes.func,
  removeShop: PropTypes.func,
  addLink: PropTypes.func,
  addShop: PropTypes.func
};
