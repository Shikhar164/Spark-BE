import { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import * as yup from "yup";
import api from "../../../service/axiosInstance";
import "./index.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { key: "Business", value: "BU", icon: <Icon icon="noto:office-building" /> },
  { key: "Creative", value: "CR", icon: <Icon icon="unjs:theme-colors" /> },
  { key: "Education", value: "ED", icon: <Icon icon="emojione:books" /> },
  {
    key: "Entertainment",
    value: "EN",
    icon: <Icon icon="emojione-v1:musical-notes" />,
  },
  {
    key: "Fashion & Beauty",
    value: "FA",
    icon: <Icon icon="twemoji:dress" />,
  },
  {
    key: "Food & Beverage",
    value: "FO",
    icon: <Icon icon="noto:pizza" />,
  },
  {
    key: "Government & Politics",
    value: "GO",
    icon: <Icon icon="codicon:law" />,
  },
  {
    key: "Health & Wellness",
    value: "HE",
    icon: <Icon icon="twemoji:red-apple" />,
  },
  { key: "Non-Profit", value: "NP", icon: <Icon icon="noto:growing-heart" /> },
  { key: "Other", value: "OT", icon: <Icon icon="noto:growing-heart" /> },
  { key: "Tech", value: "TE", icon: <Icon icon="fa-solid:desktop" /> },
  {
    key: "Travel & Tourism",
    value: "TR",
    icon: <Icon icon="emojione:airplane" />,
  },
];


const schema = yup.object().shape({
  username: yup.string().required("Please enter your username*")
});

export default function UserData({ username = "", category = "BU" }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: username,
    category: category,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await api.put("/update", formData);
      if (response.status===200) {
        navigate("/links");
      }
    } catch (err) {
      const formattedErrors = {};
      err?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="userData-container">
      <p>For a personalized Spark experience</p>
      <form className="user-info" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="spark-label">
            Username
          </label>
          <input
            id="username"
            className="spark-input"
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            placeholder="Tell us your username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <p>Select one category that best describes your Linktree:</p>
          <div className="select-category">
            {categories.map((category) => (
              <div
                key={category.key}
                className={`category ${
                  formData.category === category.value ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData((prev) => ({...prev, category: category.value}))
                }
                }>
                {category.icon}
                <span className="category-text">{category.key}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-primary full-width">Continue</button>
      </form>
    </div>
  );
}

UserData.propTypes = {
  username: PropTypes.string,
  category: PropTypes.string,
};
