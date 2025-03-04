import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

export default function Profile({ setFile }) {
  const { user, setUser } = useOutletContext();
  const inputRef = useRef(null);
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({ ...prevUser, image: imageUrl }));
    }
    setFile(file);
  };

  const handleRemoveImage = () => {
    if (user.image) {
      setUser((prevUser) => ({ ...prevUser, image: "" }));
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="box-wrapper">
      <h3>Profile</h3>
      <div className="box">
        <div className="profile-image-container">
          <div className="top-avatar">
            <img
              className="spark-mobile-top-avatar"
              src={
                user?.image ||
                "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2Fpic.png?alt=media&token=3af8019c-1e47-4cbf-a130-bcfdabc11b08"
              }
              height={96}
              width={96}
              alt="User Avatar"
            />
          </div>
          <div className="image-actions">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="file-input"
              ref={inputRef}
            />
            <button
              className="btn-primary full-width"
              onClick={() => inputRef.current.click()}>
              Pick an image
            </button>
            <button
              className="remove btn-outline full-width"
              onClick={handleRemoveImage}
              disabled={!user?.image}>
              Remove
            </button>
          </div>
        </div>
        <div className="profile-user-container">
          <div className="form-group input-special">
            <label htmlFor="username" className="spark-label">
              Profile
            </label>
            <input
              name="username"
              className="spark-input"
              id="username"
              value={user?.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group input-special">
            <label htmlFor="bio" className="spark-label">
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              className="spark-input"
              type="textarea"
              value={user?.bio}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
    setFile: PropTypes.func
}