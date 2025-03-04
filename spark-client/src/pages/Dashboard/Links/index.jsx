import { useOutletContext } from "react-router-dom";
import Mobile from "./Mobile";
import Profile from "./Profile";
import "./index.css";
import AddService from "./AddService";
import { useToast } from "../../../context/ToastContext";
import { useState } from "react";
import Banner from "./Banner";

export default function Links() {
  const { user, setUser, showMobileMenu, hideOtherMenu, customButtonColor, saveUserLinksShopsData, customButtonTextColor, customFontFamily, customThemeStyle } = useOutletContext();
  const [file, setFile] = useState(null);

  const showToast = useToast();

  const addLink = (link) => {
    setUser((prevUser) => {
      const links = [...prevUser.links, link];
      return { ...prevUser, links };
    });
    showToast("Link added successfully", "success");
  };

  const removeLink = (linkId) => {
    setUser((prevUser) => {
      const links = prevUser.links.filter((link) => link._id !== linkId);
      return { ...prevUser, links };
    });
    showToast("Link removed successfully", "success");
  };

  const addShop = (shop) => {
    setUser((prevUser) => {
      const shops = [...prevUser.shops, shop];
      return { ...prevUser, shops };
    });
    showToast("Shop added successfully", "success");
  };

  const removeShop = (shopId) => {
    setUser((prevUser) => {
      const shops = prevUser.shops.filter((shop) => shop._id !== shopId);
      return { ...prevUser, shops };
    });
    showToast("Shop removed successfully", "success");
  };

  return (
    <div className="link-section-wrapper">
      {showMobileMenu && (
        <Mobile user={user} customButtonColor={customButtonColor} customButtonTextColor={customButtonTextColor} customFontFamily={customFontFamily} customThemeStyle={customThemeStyle} />
      )}
      {!hideOtherMenu && (
        <div className="link-configure">
          <Profile setFile={setFile} />
          <AddService
            links={user?.links}
            shops={user?.shops}
            addLink={addLink}
            removeLink={removeLink}
            addShop={addShop}
            removeShop={removeShop}
          />
          <Banner />
          <div className="btn-container">
            <button
              className="btn-primary"
              onClick={() => saveUserLinksShopsData(user, file)}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
