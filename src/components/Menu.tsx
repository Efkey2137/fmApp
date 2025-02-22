import React from "react";
import { Link } from "react-router-dom";

interface MenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ menuOpen }) => {
  return (
    <nav className={`menu ${menuOpen ? "active" : ""}`}>
      <ul>
        <li><Link to="/" className="App-link">Home</Link></li>
        <li><Link to="/compare" className="App-link">Compare</Link></li>
        <li><Link to="/rate-player" className="App-link">Rate Player</Link></li>
        <li><Link to="/track-progress" className="App-link">Track Progress</Link></li>
        <li><Link to="/wonderkids" className="App-link">Wonderkids</Link></li>
        <li><Link to="/save-ideas" className="App-link">Save Ideas</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
