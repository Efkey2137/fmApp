import React from "react";
import { Link } from "react-router-dom";

interface MenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ menuOpen, setMenuOpen }) => {
  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <nav className={`menu ${menuOpen ? "active" : ""}`}>
      <ul>
        <li><Link to="/" className="App-link" onClick={handleCloseMenu}>Home</Link></li>
        <li><Link to="/compare" className="App-link" onClick={handleCloseMenu}>Compare</Link></li>
        <li><Link to="/rate-player" className="App-link" onClick={handleCloseMenu}>Rate Player</Link></li>
        <li><Link to="/track-progress" className="App-link" onClick={handleCloseMenu}>Track Progress</Link></li>
        <li><Link to="/wonderkids" className="App-link" onClick={handleCloseMenu}>Wonderkids</Link></li>
        <li><Link to="/save-ideas" className="App-link" onClick={handleCloseMenu}>Save Ideas</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
