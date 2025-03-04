import "./index.css";
import { useEffect, useState } from "react";
import Logo from "../../../../components/Logo";
import LayoutRenderer from "./LayoutRenderer"; // Import the reusable component
import Tabs from "../../../../components/Tabs";
import {
  getFill,
  getHardShadow,
  getOutline,
  getSoftShadow,
  getThemeStyle,
} from "../../../../components/utils";
import PropTypes from "prop-types";

export default function Mobile({ user, customButtonColor, customButtonTextColor, customFontFamily, customThemeStyle, generateShareLink, openView = false, ctaClick }) {
  const [activeTab, setActiveTab] = useState("links"); // Default tab
  const layoutType = user?.userTheme?.layoutType;
  const bannerColor =
    user && user.userTheme ? user.userTheme.bannerColor : "#000000";
  const fill = user && user.userTheme ? user.userTheme.button.fill : "standard";
  const outline =
    user && user.userTheme ? user.userTheme.button.outline : "standard";
  const hardShadow =
    user && user.userTheme ? user.userTheme.button.hardShadow : "standard";
  const softShadow =
    user && user.userTheme ? user.userTheme.button.softShadow : "standard";

  const tabs = [
    { id: 1, label: "Links", value: "links" },
    { id: 2, label: "Shops", value: "shops" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="spark-mobile-preview" style={{fontFamily: customFontFamily}}>
      <div className="spark-mobile-frame" style={{backgroundColor: getThemeStyle(customThemeStyle).backgroundColor}}>
        <div
          className="spark-mobile-top"
          style={{ backgroundColor: bannerColor }}>
          <div className="spark-mobile-top-wrapper">
            <img
              className="spark-mobile-top-avatar"
              src={
                user?.image ||
                "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2Fpic.png?alt=media&token=3af8019c-1e47-4cbf-a130-bcfdabc11b08"
              }
              height={96}
              width={96}
              alt="User Avatar"
            />
            <h3 className="spark-mobile-top-avatar-username">
              @{user?.username}
            </h3>
          </div>
        </div>
        <div className="spark-mobile-container">
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="spark-mobile-content">
            {activeTab === "links" ? (
              <LayoutRenderer
                items={user?.links}
                layoutType={layoutType}
                fill={fill}
                outline={outline}
                hardShadow={hardShadow}
                softShadow={softShadow}
                customButtonColor={customButtonColor}
                customButtonTextColor={customButtonTextColor}
                customThemeStyle={customThemeStyle}
                ctaClick={ctaClick}
                openView={openView}
              />
            ) : (
              <LayoutRenderer
                items={user?.shops}
                layoutType={layoutType}
                isShop={true}
                fill={fill}
                outline={outline}
                hardShadow={hardShadow}
                softShadow={softShadow}
                customButtonColor={customButtonColor}
                customButtonTextColor={customButtonTextColor}
                customThemeStyle={customThemeStyle}
                ctaClick={ctaClick}
                openView={openView}
              />
            )}
          </div>
        </div>
        {!openView && <div className="spark-mobile-footer" >
          <button
            className="btn-primary"
            style={{
              ...getFill(fill),
              ...getOutline(outline),
              ...getHardShadow(hardShadow),
              ...getSoftShadow(softShadow),
              backgroundColor: customButtonColor,
              color: customButtonTextColor
            }} onClick={generateShareLink}>
            Get Connected
          </button>
          <Logo
            imageUrl="https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2FLogo.png?alt=media&token=4ae9796e-a1b4-4516-9e5a-d2e9354efc08"
            label="SPARK"
          />
        </div>}
      </div>
    </div>
  );
}

Mobile.propTypes = {
  user: PropTypes.object.isRequired,
  customButtonColor: PropTypes.string,
  customButtonTextColor: PropTypes.string,
  customFontFamily: PropTypes.string,
  customThemeStyle: PropTypes.string,
  generateShareLink: PropTypes.func.isRequired,
  openView: PropTypes.bool,
  ctaClick: PropTypes.func.isRequired
};