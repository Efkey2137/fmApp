import React from "react";
import { Diff, Star, ChartLine, Lightbulb, SearchCheck, MessageCircleQuestion, NotepadText, Presentation } from 'lucide-react';
import { Link } from "react-router-dom";
import "../index.css"
// import "../css/Dashboard.css";

const cards = [
  // { id: 1, title: "Compare", icon: Diff, link: "/compare" },
  { id: 2, title: "Rate Player", icon: SearchCheck, link: "/rate-player" },
  { id: 3, title: "Rate Team", icon: NotepadText, link: "/rate-team" },
  // { id: 4, title: "Track Progress", icon: ChartLine, link: "/track-progress" },
  { id: 5, title: "Wonderkids", icon: Star, link: "/wonderkids" },
  { id: 6, title: "Save Ideas", icon: Lightbulb, link: "/save-ideas" },
  { id: 7, title: "FAQ", icon: MessageCircleQuestion, link: "/faq" },
  { id: 8, title: "Discord", icon: Presentation, link: "https://discord.gg/FpPvXzwUw4" },
];

const Home: React.FC = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-8 max-w-[1200px] mx-auto">
      {cards.map((card) => {
  // Sprawdź czy link jest zewnętrzny (zaczyna się od http lub https)
  const isExternalLink = card.link.startsWith('http');
  
  return isExternalLink ? (
    // Dla zewnętrznych linków użyj tagu <a> z target="_blank"
    <a 
      href={card.link} 
      key={card.id}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline text-white transition-transform duration-200 ease-in-out hover:-translate-y-1"
    >
      <div className="bg-[#1b1b1b] border border-[#393046] rounded-lg p-8 text-center transition-all duration-300 ease-in-out min-h-[250px] flex flex-col justify-center items-center hover:shadow-lg hover:border-[#9a66ff] group">
        <card.icon size={48} className="w-20 h-20 text-white-500 group-hover:text-[#9a66ff]" />
        <h2 className="mt-6 text-2xl font-semibold text-white transition-colors duration-200 ease-in-out group-hover:text-[#9a66ff]">
          {card.title}
        </h2>
      </div>
    </a>
  ) : (
    // Dla wewnętrznych linków użyj komponentu Link
    <Link 
      to={card.link} 
      key={card.id}
      className="no-underline text-white transition-transform duration-200 ease-in-out hover:-translate-y-1"
    >
      <div className="bg-[#1b1b1b] border border-[#393046] rounded-lg p-8 text-center transition-all duration-300 ease-in-out min-h-[250px] flex flex-col justify-center items-center hover:shadow-lg hover:border-[#9a66ff] group">
        <card.icon size={48} className="w-20 h-20 text-white-500 group-hover:text-[#9a66ff]" />
        <h2 className="mt-6 text-2xl font-semibold text-white transition-colors duration-200 ease-in-out group-hover:text-[#9a66ff]">
          {card.title}
        </h2>
      </div>
    </Link>
  );
})}

    </div>
  );
};

export default Home;