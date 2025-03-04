import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/Auth";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import UserData from "./pages/Auth/UserData";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./config/ProtectedRoute";
import { ToastProvider } from "./context/ToastContext";
import Links from "./pages/Dashboard/Links";
import LoadingOverlay from "./components/LoadingOverlay";
import { LoadingProvider } from "./context/LoadingContext";
import Appearance from "./pages/Dashboard/Appearance";
import Settings from "./pages/Dashboard/Settings";
import Home from "./pages/Home";
import Share from "./pages/Share";
import Analytics from "./pages/Dashboard/Analytics";

function App() {
  return (
    <ToastProvider>
      <LoadingProvider>
        <LoadingOverlay />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/share/:id" element={<Share />} />
            <Route path="/" element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/userData"
                element={
                  <ProtectedRoute>
                    <UserData />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }>
              <Route
                path="/links"
                element={
                  <ProtectedRoute>
                    <Links />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appearance"
                element={
                  <ProtectedRoute>
                    <Appearance />
                  </ProtectedRoute>
                }
              />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </LoadingProvider>
    </ToastProvider>
  );
}

export default App;
