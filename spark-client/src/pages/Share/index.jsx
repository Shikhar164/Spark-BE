import { useEffect, useState } from "react";
import api from "../../service/axiosInstance";
import Mobile from "../Dashboard/Links/Mobile";
import { useToast } from "../../context/ToastContext";
import { useParams } from "react-router-dom";
import "./index.css";

export default function Share() {
  const [user, setUser] = useState({});
  const showToast = useToast();

  const { id: userId } = useParams();

  const getUser = () => {
    api
      .get(`/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        showToast(
          err?.response?.data?.message || "Something went wrong",
          "error"
        );
      });
  };

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

  useEffect(getUser, []);

  return (
    <div className="share-view configure-mobile-preview">
      <Mobile user={user} openView={true} ctaClick={ctaClick} />
    </div>
  );
}
