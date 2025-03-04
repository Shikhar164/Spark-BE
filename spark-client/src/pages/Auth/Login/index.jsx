import { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../../../service/axiosInstance";
import { useToast } from "../../../context/ToastContext";

const schema = yup.object().shape({
  userNameOrEmail: yup
    .string()
    .required("Please enter your username or email*"),
  password: yup.string().required("Please enter your password*"),
});

export default function Login() {
  const navigate = useNavigate();
  const showToast = useToast();

  const [formData, setFormData] = useState({
    userNameOrEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) localStorage.removeItem("token");
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await api.post("/login", formData);
      if (response.status === 200) {
        if (!response.data.user.isUserNameAdded) {
          localStorage.setItem("isUserNameAdded", response.data.user.isUserNameAdded);
          navigate("/userData");
        } else {
          navigate("/links");
        }
      }
    } catch (err) {
      err?.response?.data?.message && showToast(err.response.data.message, "error");
      const formattedErrors = {};
      err?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="login-container">
      <form id="login-form" className="login-form-cls" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userNameOrEmail" className="spark-label">
            Username / Email
          </label>
          <input
            id="userNameOrEmail"
            className="spark-input"
            type="text"
            name="userNameOrEmail"
            onChange={handleChange}
            value={formData.userNameOrEmail}
          />
          {errors.userNameOrEmail && (
            <span className="error">{errors.userNameOrEmail}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="spark-label">
            Password
          </label>
          <input
            id="password"
            className="spark-input"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button className="btn-primary full-width m-5">Sign in</button>
        <div className="login-footer">
          <span>Don&apos;t have an account?</span>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
