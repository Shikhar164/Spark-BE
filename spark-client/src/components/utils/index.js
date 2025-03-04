export const getImageUrl = (linkType) => {
  switch (linkType) {
    case "YT":
      return "logos:youtube-icon";
    case "FB":
      return "logos:facebook";
    case "TW":
      return "devicon:twitter";
    case "IN":
      return "skill-icons:instagram";
    case "OT":
      return "flat-color-icons:shop";
    default:
      return "flat-color-icons:shop"; // Default placeholder
  }
};

export const getFill = (fill) => {
  switch (fill) {
    case "standard":
      return {
        backgroundColor: "#000000",
        borderRadius: "0px",
        fontColor: "#FFFFFF",
      };
    case "medium":
      return {
        backgroundColor: "#000000",
        borderRadius: "8px",
        fontColor: "#FFFFFF",
      };
    case "rounded":
      return {
        backgroundColor: "#000000",
        borderRadius: "96px",
        fontColor: "#FFFFFF",
      };
    default:
      return {};
  }
};

export const getOutline = (outline) => {
  switch (outline) {
    case "standard":
      return {
        outline: "2px solid black",
        borderRadius: "0px",
      };
    case "medium":
      return {
        outline: "2px solid black",
        borderRadius: "8px",
      };
    case "rounded":
      return {
        outline: "2px solid black",
        borderRadius: "96px",
      };
    default:
      return {};
  }
};

export const getHardShadow = (hardShadow) => {
  switch (hardShadow) {
    case "standard":
      return {
        boxShadow: "4px 4px 0px #000000",
        borderRadius: "0px",
        outline: "2px solid black",
      };
    case "medium":
      return {
        boxShadow: "4px 4px 0px #000000",
        borderRadius: "8px",
        outline: "2px solid black",
      };
    case "rounded":
      return {
        boxShadow: "4px 4px 0px #000000",
        borderRadius: "96px",
        outline: "2px solid black",
      };
    default:
      return {};
  }
};

export const getSoftShadow = (softShadow) => {
  switch (softShadow) {
    case "standard":
      return {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.16)",
        outline: "none",
        borderRadius: "0px",
      };
    case "medium":
      return {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.16)",
        outline: "none",
        borderRadius: "8px",
      };
    case "rounded":
      return {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.16)",
        outline: "none",
        borderRadius: "96px",
      };
    default:
      return {};
  }
};

export const getThemeStyle = (themeStyle) => {
    switch (themeStyle) {
      case "AIR_SNOW":
        return {
          backgroundColor: "#FFFFFF", // Pure White
          elementColor: "#F0F0F0", // Light Grey for subtle contrast
          textColor: "#1E1E1E", // Dark Gray for readability
        };
      case "AIR_GREY":
        return {
          backgroundColor: "#F0F2F5", // Soft Light Grey
          elementColor: "#D6D6D6", // Muted Grey
          textColor: "#333333", // Dark Grey for contrast
        };
      case "AIR_SMOKE":
        return {
          backgroundColor: "#EAEAEA", // Smoky White
          elementColor: "#C4C4C4", // Soft Grey
          textColor: "#222222", // Dark Gray
        };
      case "AIR_BLACK":
        return {
          backgroundColor: "#181818", // Rich Black
          elementColor: "#222222", // Slightly lighter black for contrast
          textColor: "#FFFFFF", // White for contrast
        };
      case "MINERAL_BLUE":
        return {
          backgroundColor: "#007BFF", // Vibrant Royal Blue
          elementColor: "#0056B3", // Darker Blue for UI elements
          textColor: "#FFFFFF",
        };
      case "MINERAL_GREEN":
        return {
          backgroundColor: "#28A745", // Deep Green
          elementColor: "#1E7E34", // Darker Green
          textColor: "#FFFFFF",
        };
      case "MINERAL_ORANGE":
        return {
          backgroundColor: "#FF9800", // Bright Orange
          elementColor: "#E57C00", // Darker Orange
          textColor: "#FFFFFF",
        };
      case "NONE":
      default:
        return {
          backgroundColor: "#202020", // Dark Gray as default
          elementColor: "#303030", // Slightly lighter for contrast
          textColor: "#FFFFFF",
        };
    }
  };
  