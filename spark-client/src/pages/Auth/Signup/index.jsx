import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import * as yup from "yup";
import api from "../../../service/axiosInstance";
import { useToast } from "../../../context/ToastContext";

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name*"),
  lastName: yup.string().required("Please enter your last name*"),
  email: yup
    .string()
    .email("Please enter valid email*")
    .required("Please enter your email*"),
  password: yup
    .string()
    .required("Please enter your password*")
    .min(8, "The password must be at least 8 characters long*")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Please choose a strong password that includes at least 1 lowercase and uppercase letter, a number, as well as a special character (!@#$%^&*)"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match*")
    .required("Please confirm your password*"),
  terms: yup.boolean().oneOf([true], "You must accept the terms*"),
});

export default function Signup() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) localStorage.removeItem("token");
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeTerms = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value === "on" ? true : false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await api.post("/signup", formData);
      if (response.status === 201) {
        if (!response.data.user.isUserNameAdded) {
          localStorage.setItem("isUserNameAdded", response.data.user.isUserNameAdded)
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
    <div className="signup-container">
      <div className="signup-header">
        <h4>Create an account</h4>
        <Link to="/login">Sign in instead</Link>
      </div>
      <form
        id="signup-form"
        className="signup-form-cls"
        onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName" className="spark-label">
            First name
          </label>
          <input
            id="firstName"
            className="spark-input"
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="spark-label">
            Last name
          </label>
          <input
            id="lastName"
            className="spark-input"
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="spark-label">
            Email
          </label>
          <input
            id="email"
            className="spark-input"
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          {errors.email && <span className="error">{errors.email}</span>}
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
        <div className="form-group">
          <label htmlFor="confirmPassword" className="spark-label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            className="spark-input"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <div className="form-group-row">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            onChange={handleChangeTerms}
            required
          />
          <label htmlFor="terms" className="terms spark-label">
            By creating an account, I agree to our <u>Terms of use</u> and{" "}
            <u>Privacy Policy</u>{" "}
          </label>
        </div>
        <button className="btn-primary full-width m-5">
          Create an account
        </button>
      </form>
    </div>
  );
}
