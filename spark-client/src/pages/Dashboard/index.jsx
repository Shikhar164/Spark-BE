import { Link, Outlet, useLocation } from "react-router-dom";
import "./index.css";
import Logo from "../../components/Logo";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import api from "../../service/axiosInstance";
import { useToast } from "../../context/ToastContext";
import WelcomeHeader from "../../components/WelcomeHeader";
import { getFill } from "../../components/utils";

const navigations = [
  {
    key: 1,
    to: "/links",
    name: "Links",
    icon: "line-md:link",
  },
  {
    key: 2,
    to: "/appearance",
    name: "Appearance",
    icon: "material-symbols:shapes-outline-sharp",
  },
  {
    key: 3,
    to: "/analytics",
    name: "Analytics",
    icon: "fluent:data-pie-24-regular",
  },
  {
    key: 4,
    to: "/settings",
    name: "Settings",
    icon: "material-symbols:settings-outline",
  },
];

export default function Dashboard() {
  const { pathname } = useLocation();
  const [user, setUser] = useState();
  const showToast = useToast();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [customButtonColor, setCustomButtonColor] = useState("#28A263");
  const [customFontFamily, setCustomFontFamily] = useState("Poppins");
  const [customButtonTextColor, setCustomButtonTextColor] = useState("#ffffff");
  const [customThemeStyle, setCustomThemeStyle] = useState("NONE");

  const [showMobileMenu, setShowMobileMenu] = useState(
    window.innerWidth <= 820 ? false : true
  );
  const [hideOtherMenu, setHideOtherMenu] = useState(
    window.innerWidth <= 820 && showMobileMenu ? true : false
  );

  const openMobileMenu = () => {
    setShowMobileMenu(true);
    setHideOtherMenu(true);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
    setHideOtherMenu(false);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.scrollTo(0, 0);
      setShowMobileMenu(window.innerWidth <= 820 ? false : true);
      setHideOtherMenu(
        window.innerWidth <= 820 && showMobileMenu ? true : false
      );
    });
  }, [showMobileMenu]);

  const handleResize = () => {
    window.scrollTo(0, 0);
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    api
      .get("/user")
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setCustomButtonColor(
            res.data.userTheme.button.backgroundColor ||
              getFill(res.data.userTheme.button.fill)?.backgroundColor ||
              "#28A263"
          ); // Set custom button color
          setCustomButtonTextColor(
            res.data.userTheme.button.color ||
              getFill(res.data.userTheme.button.fill)?.color ||
              "#ffffff"
          ); // Set custom button text color
          setCustomFontFamily(res.data.fontInfo.fontType || "Poppins");
          setCustomThemeStyle(res.data.themeStyle);
        }
      })
      .catch((err) => {
        showToast(err.response.data.message, "error");
      });
  }, []);

  const ctaClick = (data) => {
    api.post("/analytics/postClick", {
      userId: data.userId,
      linkId: data.linkId,
      linkUrl: data.linkUrl,
      linkType: data.linkType,
      viewType: data.viewType,
      deviceInfo: data.deviceInfo,
    });
  };

  const generateShareLink = () => {
    api.get('/share').then(res => {
      if (res.status === 200) {
        showToast("Link generated successful", "success");
        window.open(res.data.shareLink, "_blank");
      }
    }).catch(err => {
      showToast(err?.response?.data?.message || "Something went wrong", "error");
      console.log(err);
    })
  }

  const saveUserLinksShopsData = (user, file) => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("bio", user.bio);
    formData.append("image", file);
    formData.append("userTheme", JSON.stringify(user.userTheme));
    formData.append("links", JSON.stringify(user.links));
    formData.append("shops", JSON.stringify(user.shops));
    formData.append("themeStyle", user.themeStyle);
    formData.append("fontInfo", JSON.stringify(user.fontInfo));
    
    api
      .put("/updateUserPreferences", formData, true)
      .then((res) => {
        if (res.status === 200) {
          showToast("User preferences updated successfully", "success");
        }
      })
      .catch((err) => showToast(err.response.data.message, "error"));
  };

  const renderNav = (navClass) => {
    return (
      <nav className={`navbar ${navClass}`}>
        <div className="nav-items">
          {navigations?.map((navItem) => {
            return (
              <Link
                key={navItem.key}
                className={`nav-item ${
                  pathname === navItem.to ? "selected" : ""
                }`}
                to={navItem.to}>
                <Icon
                  icon={navItem.icon}
                  height={navItem.size}
                  width={navItem.size}
                />
                {navItem.name}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  };

  return (
    <div className="dashboard-wrapper">
      <div className="spark-sidebar">
        <div className="spark-sidebar-logo">
          <Logo
            imageUrl="https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2FLogo.png?alt=media&token=4ae9796e-a1b4-4516-9e5a-d2e9354efc08"
            label="SPARK"
          />
          {renderNav()}
        </div>

        <div className="spark-user">
          <div className="user-pill">
            <img
              src={
                user?.imageUrl ||
                "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2Fpic.png?alt=media&token=3af8019c-1e47-4cbf-a130-bcfdabc11b08"
              }
              height={32}
              width={32}
            />
            <label>
              {user?.firstName} {user?.lastName}
            </label>
          </div>
        </div>
      </div>
      <main
        className={`spark-content ${
          innerWidth <= 820 && showMobileMenu ? "configure-mobile-preview" : ""
        }`}>
        <WelcomeHeader user={user} />
        <Outlet
          context={{
            user,
            setUser,
            openMobileMenu,
            closeMobileMenu,
            showMobileMenu,
            hideOtherMenu,
            customButtonColor,
            setCustomButtonColor,
            customButtonTextColor,
            setCustomButtonTextColor,
            customFontFamily,
            setCustomFontFamily,
            customThemeStyle,
            setCustomThemeStyle,
            saveUserLinksShopsData,
            generateShareLink,
            ctaClick
          }}
        />
      </main>
      {innerWidth <= 820 && !showMobileMenu && renderNav("navbar-mobile")}
      {innerWidth <= 820 && showMobileMenu && (
        <div className="close-mobile-menu" onClick={closeMobileMenu}>
          <Icon icon="radix-icons:cross-1" />
        </div>
      )}
    </div>
  );
}
