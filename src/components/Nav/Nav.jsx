import React from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebaseconfig/config";

function Nav() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/first");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon-wrapper">
            <span className="logo-icon">💎</span>
          </div>
          <span className="logo-text">Atlasify</span>
        </div>

        <nav>
          <a href="" className="nav-link active">
            Home
          </a>
          <a href="" className="nav-link">
            Explore
          </a>
          <a href="" className="nav-link">
            Roadmaps
          </a>
          <a href="" className="nav-link">
            About
          </a>
        </nav>
     <div className="nav-div">
        <button onClick={() => navigate("/chat")} className="cta-button">
          🤖 Ask AI Mentor
        </button>

        <button className="cta-button">
          <a className="Get-button" onClick={handleLogout}>
            {" "}
            Log Out
          </a>
        </button></div>
      </div>
    </header>
  );
}

export default Nav;
