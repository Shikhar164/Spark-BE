import { Icon } from "@iconify/react"; // Ensure you import your Icon component
import PropTypes from "prop-types";
import {
  getFill,
  getHardShadow,
  getImageUrl,
  getOutline,
  getSoftShadow,
  getThemeStyle,
} from "../../../../../components/utils";
import { useId } from "react";

const LayoutRenderer = ({
  items,
  layoutType,
  isShop = false,
  fill,
  outline,
  hardShadow,
  softShadow,
  customButtonColor,
  customButtonTextColor,
  customThemeStyle,
  ctaClick,
  openView
}) => {
  const { elementColor, textColor } = getThemeStyle(customThemeStyle);
  const id = useId();
  const renderItem = (item) => (
    <a
      key={id}
      href={isShop ? item.shopUrl : item.linkUrl}
      target="_blank"
      onClick={() => ctaClick({
        userId: item.userId,
        linkId: item._id,
        linkUrl: item.linkUrl || item.shopUrl,
        linkType: item.linkType,
        viewType: openView ? "EXTERNAL" : "INTERNAL",
        deviceInfo: navigator.userAgent
      })}
      rel="noopener noreferrer">
      <div
        className={`spark-mobile-pill ${isShop && "shop"} ${
          layoutType === "CAROUSEL" ? "spark-mobile-carousel-item" : ""
        }`} style={{backgroundColor: elementColor, color: textColor}}>
        <div className="spark-mobile-pill-avatar">
          <Icon
            icon={getImageUrl(item.linkType)}
            alt={isShop ? item.shopTitle : item.linkTitle}
            height={24}
            width={24}
          />
        </div>
        <span className="spark-mobile-pill-text">
          {isShop ? item.shopTitle : item.linkTitle}
        </span>
        {isShop && (
          <button
            className="btn-primary small"
            style={{
              ...getFill(fill),
              ...getOutline(outline),
              ...getHardShadow(hardShadow),
              ...getSoftShadow(softShadow),
              backgroundColor: customButtonColor,
              color: customButtonTextColor
            }}>
            🛒 &nbsp; Buy now
          </button>
        )}
      </div>
    </a>
  );

  if (layoutType === "STACK") {
    return <>{items.map(renderItem)}</>;
  } else if (layoutType === "GRID") {
    return <div className="spark-mobile-grid">{items?.map(renderItem)}</div>;
  } else {
    return (
      <div className="spark-mobile-carousel">{items?.map(renderItem)}</div>
    );
  }
};

LayoutRenderer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      linkTitle: PropTypes.string,
      linkUrl: PropTypes.string,
      shopTitle: PropTypes.string,
      shopUrl: PropTypes.string,
      linkType: PropTypes.string,
    })
  ).isRequired,
  layoutType: PropTypes.oneOf(["STACK", "GRID", "CAROUSEL"]).isRequired,
  isShop: PropTypes.bool,
  fill: PropTypes.string,
  outline: PropTypes.string,
  hardShadow: PropTypes.string,
  softShadow: PropTypes.string,
  customButtonColor: PropTypes.string,
  customButtonTextColor: PropTypes.string,
  customThemeStyle: PropTypes.string,
  ctaClick: PropTypes.func.isRequired,
  openView: PropTypes.bool
};

export default LayoutRenderer;
