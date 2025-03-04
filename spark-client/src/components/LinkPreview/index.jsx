import { Icon } from "@iconify/react";
import "./index.css";
import PropTypes from "prop-types";

export default function LinkPreview({ linkData, removeLink, removeShop }) {
  return (
    <div className="link-preview input-special">
      <label className="spark-label">{linkData?.linkTitle || linkData?.shopTitle}</label>
      <label className="spark-label">{linkData?.linkUrl || linkData?.shopUrl}</label>
      <div className="link-preview-footer">
        <div className="link-click spark-label">
            <Icon icon="material-symbols:image-outline" />
            <Icon icon="material-symbols:bar-chart" />
            <span>{linkData?.linkClicks || linkData?.shopLinkClicks || 0} clicks</span>
        </div>
        <div className="link-delete">
            <Icon icon="ion:trash-outline" onClick={() => linkData?.linkType !== "OT" ? removeLink(linkData._id) : removeShop(linkData._id)} />
        </div>
      </div>
    </div>
  )
}

LinkPreview.propTypes = {
    linkData: PropTypes.obj,
    removeLink: PropTypes.func,
    removeShop: PropTypes.func
}


