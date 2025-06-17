import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Upload from "./pages/Upload";
import Files from "./pages/Files";
import Charts from "./pages/Charts";
import FooterPage from "./components/FooterPage";
import { setAuthToken } from "./services/API";
import ChatbotWidget from "./components/ChatbotWidget";
import "./App.css";

function AppContent({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to home page on refresh if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isFirstLoad = performance.getEntriesByType("navigation")[0]?.type === "reload";
    if (token && isFirstLoad && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <Upload />
              </PrivateRoute>
            }
          />
          <Route
            path="/files"
            element={
              <PrivateRoute>
                <Files />
              </PrivateRoute>
            }
          />
          <Route
            path="/charts"
            element={
              <PrivateRoute>
                <Charts />
              </PrivateRoute>
            }
          />
          <Route
            path="/footerpage"
            element={
              <PrivateRoute>
                <FooterPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ChatbotWidget />
      </div>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
}

export default App;