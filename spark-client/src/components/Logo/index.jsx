import PropTypes from "prop-types";
import "./index.css";

const Logo = ({imageUrl, label, subLabel}) => {
  
  return (
    <div className="logo-container">
      <div className="logo-image">
        <img src={imageUrl} />
      </div>
      <div className="logo-name">
        {label}
      </div>
      {subLabel && <hr width="0" size="20" color="black" />}
      <div className="logo-subtext">
        {subLabel}
      </div>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.string
}

export default Logo;
