import { useCallback, useEffect, useState } from "react";
import "./index.css";
import api from "../../../service/axiosInstance";
import { useToast } from "../../../context/ToastContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  // Default one-week time range include today
  const showToast = useToast();
  const [timeRange, setTimeRange] = useState({
    startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  });

  const [analyticsData, setAnalyticsData] = useState([]);

  const [error, setError] = useState(""); // Error message state

  // Handle input change with validation
  const handleDateChange = (e, key) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setTimeRange((prev) => {
        if (key === "startDate" && newDate > prev.endDate) {
          setError("Start date cannot be after end date.");
          return prev;
        }
        if (key === "endDate" && newDate < prev.startDate) {
          setError("End date cannot be before start date.");
          return prev;
        }
        setError(""); // Clear error if valid
        return { ...prev, [key]: newDate };
      });
    }
  };

  const getAnalytics = useCallback(() => {
    // Send the time range to the server
    api
      .post("/analytics/fetchData", {
        startDate: timeRange.startDate,
        endDate: timeRange.endDate,
      })
      .then((res) => {
        if (res.status === 200) {
          setAnalyticsData(res.data);
        }
      })
      .catch((err) => {
        showToast(
          err?.response?.data?.message || "Something went wrong",
          "error"
        );
      });
  }, [timeRange]);

  useEffect(() => {
    getAnalytics();
  }, []);

  // Convert data into recharts-friendly format
  const chartData = analyticsData?.clicksPerMonth?.months.map(
    (month, index) => ({
      month,
      count: analyticsData?.clicksPerMonth?.counts[index],
    })
  );

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h5>Overview</h5>
        <div className="analytics-time-range">
          <div className="analytics-time-range-input">
            <input
              type="date"
              value={timeRange?.startDate?.toISOString()?.split("T")[0]}
              onChange={(e) => handleDateChange(e, "startDate")}
            />
            <input
              type="date"
              value={timeRange?.endDate?.toISOString()?.split("T")[0]}
              onChange={(e) => handleDateChange(e, "endDate")}
            />
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <div className="analytics-counts">
        <div className="analytics-counts-items totalLinkCount">
          <p className="count-label">Clicks on Links</p>
          <p className="count-value">{analyticsData?.linkTotalClicks}</p>
        </div>
        <div className="analytics-counts-items totalShopCount">
          <p className="count-label">Clicks on Links</p>
          <p className="count-value">{analyticsData?.shopTotalClicks}</p>
        </div>
        <div className="analytics-counts-items totalCTACount">
          <p className="count-label">CTA</p>
          <p className="count-value">{analyticsData?.allClicks}</p>
        </div>
      </div>
        <ResponsiveContainer className="clicksPerMonth" width={"100%"} height={400}>
          <LineChart data={chartData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3f51b5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
    </div>
  );
}
