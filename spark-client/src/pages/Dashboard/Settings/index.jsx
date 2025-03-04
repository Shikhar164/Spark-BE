import { useEffect, useState } from "react";
import * as yup from "yup";
import api from "../../../service/axiosInstance";
import { useToast } from "../../../context/ToastContext";
import "./index.css";
import { useOutletContext } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name*"),
  lastName: yup.string().required("Please enter your last name*"),
  email: yup.string().email("Please enter a valid email address*"),
  password: yup.string().required("Please enter your password*"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password*")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function Settings() {
  const { user } = useOutletContext();

  const showToast = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: "",
      confirmPassword: "",
    });
  }, [user]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await api.put("/update", formData);
      if (response.status === 200) {
        showToast("Profile updated successfully", "success");
        setFormData({
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      showToast(
        err?.response?.data?.message || "Something went wrong",
        "error"
      );
      const formattedErrors = {};
      err?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="settings-container">
      <label className="spark-label green">Edit Profile</label>
      <hr
        style={{
          border: "0.1px solid lightgrey",
          width: "100%",
          margin: "0 auto 20px auto",
        }}
      />
      <form className="edit-profile" onSubmit={handleSubmit}>
        <div className="spark-all-input-container">
          <div className="form-group">
            <label htmlFor="firstName" className="spark-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="spark-input"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="spark-label">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="spark-input"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="spark-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="spark-input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="spark-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="spark-input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="spark-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="spark-input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <div className="btn-container">
          <button className="btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}
