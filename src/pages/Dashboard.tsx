import React from "react";
import { Diff, Star, ChartLine, Lightbulb, SearchCheck  } from 'lucide-react';
import { Link } from "react-router-dom";
import "../css/Dashboard.css";


const cards = [
  { id: 1, title: "Compare", icon: Diff, link: "/compare" },
  { id: 2, title: "Rate Player", icon: SearchCheck, link: "/rate" },
  { id: 3, title: "Track Progress", icon: ChartLine, link: "/progress" },
  { id: 4, title: "Wonderkids", icon: Star, link: "/wonderkids" },
  { id: 5, title: "Save Ideas", icon: Lightbulb, link: "/ideas" },
];


const Home: React.FC = () => {
  return (
    <div className="dashboard">
      {cards.map((card) => (
        <Link to={card.link} className="card-link"><div key={card.id} className="p-4 border rounded-lg shadow flex flex-col items-center">
          <card.icon size={48} className="text-blue-500" />
          <h2 className="mt-2">{card.title}</h2>
        </div></Link>
      ))}
    </div>
  );
};

export default Home;
