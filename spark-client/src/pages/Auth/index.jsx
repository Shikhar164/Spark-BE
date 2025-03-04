import { Outlet, useLocation } from "react-router-dom";
import "./index.css"; // Import CSS for styling
import Logo from "../../components/Logo";

const AuthLayout = () => {
  const { pathname } = useLocation();

  const renderTitle = () => {
    return pathname === "/login"
      ? "Sign in to your Spark"
      : pathname === "/signup"
      ? "Sign up to your Spark"
      : "Tell us about yourself";
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="auth-spark-logo">
          <Logo
            imageUrl="https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2FLogo.png?alt=media&token=4ae9796e-a1b4-4516-9e5a-d2e9354efc08"
            label="SPARK"
          />
        </div>
        <h1 className="auth-spark-title">{renderTitle()}</h1>
        <div className="auth-spark-content">
          <Outlet /> {/* This will render Login or Signup based on route */}
        </div>
        <div className="auth-spark-footer">
          <span>
            This site is protected by reCAPTCHA and the{" "}
            <u>Google Privacy Policy</u> and <u>Terms of Service</u> apply.
          </span>
        </div>
      </div>
      <div className="auth-image">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2Flogin.png?alt=media&token=b4cb9dbf-ac99-4574-b645-abb4d70b20d5"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
