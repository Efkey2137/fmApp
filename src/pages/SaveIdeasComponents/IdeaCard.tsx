import React from "react";

interface IdeaCardProps {
  idea: any;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  return (
    <div 
      className="bg-[#1b1b1b] border-2 border-primary rounded p-4 
               text-left flex flex-col justify-between 
               transition-all duration-300 ease-in-out
               hover:border-primary-hover"
    >
      <h3 className="text-xl font-semibold mb-2 flex items-center">
        {idea.club} - {idea.league}
      </h3>
      <p className="text-gray-300">{idea.description}</p>
    </div>
  );
};

export default IdeaCard;
