import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Navbar(props) {
  const { setModalOpen } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <button onClick={() => setModalOpen(true)}>
          Create Post
        </button>
        <button onClick={handleLogout} className="nav-button logout">
          Logout
        </button>
      </div>
    </nav>
  );
}
