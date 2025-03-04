import { useLoading } from "../../context/LoadingContext";
import "./index.css"; // Add styles

export default function LoadingOverlay() {
  const { loading } = useLoading();

  if (!loading) return null; // Hide when not loading

  return (
    <div className="overlay">
      <div className="spinner"></div>
    </div>
  );
}
