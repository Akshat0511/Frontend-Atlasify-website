import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">💎</span>
          <span className="logo-text">Atlasify <span className="logo-subtext">- Map Your Learning Journey</span></span>
        </div>
        
       

        <button className="cta-button">
         <a class="Get-button" onClick={() => navigate("/signup")}> Get Started</a>
        </button>
      </div>
    </header>
  );
}

export default Header;
