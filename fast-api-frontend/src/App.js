import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import PostsPage from "./pages/post/PostPage";
import "./index.css"

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
        <Routes>
          <Route path="/" element={isAuthenticated ? <PostsPage /> : <LoginPage setAuth={setIsAuthenticated} />} />
          <Route path="/login" element={<LoginPage setAuth={setIsAuthenticated} />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/create-post" element={<CreatePost/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}
