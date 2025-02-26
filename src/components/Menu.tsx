import React from "react";
import { Link } from "react-router-dom";
import "../css/Menu.css";
import { House, Diff, Star, ChartLine, Lightbulb, SearchCheck  } from 'lucide-react';
import logo from "../assets/logo.png";


interface MenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ menuOpen, setMenuOpen }) => {
  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <nav className={`menu ${menuOpen ? "active" : ""}`}>
      <div className="App-logo-menu">
        <img src={logo} alt="logo" className="logo-img" />
        AskMngr
      </div>
      <ul>
        <li><Link to="/" className="App-link" onClick={handleCloseMenu}><House/>Home</Link></li>
        <li><Link to="/compare" className="App-link" onClick={handleCloseMenu}><Diff/>Compare</Link></li>
        <li><Link to="/rate-player" className="App-link" onClick={handleCloseMenu}><SearchCheck />Rate Player</Link></li>
        <li><Link to="/track-progress" className="App-link" onClick={handleCloseMenu}><ChartLine/>Track Progress</Link></li>
        <li><Link to="/wonderkids" className="App-link" onClick={handleCloseMenu}><Star/>Wonderkids</Link></li>
        <li><Link to="/save-ideas" className="App-link" onClick={handleCloseMenu}><Lightbulb/>Save Ideas</Link></li>
      </ul>
    </nav>
  );
};


export default Menu;
