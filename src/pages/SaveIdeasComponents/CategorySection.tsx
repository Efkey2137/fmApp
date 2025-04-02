import React from "react";
import IdeaCard from "./IdeaCard";

interface CategorySectionProps {
  category: string;
  items: any[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, items }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl text-center mb-4 font-semibold">{category}</h2>
      <div className="grid grid-cols-1 gap-4">
        {items.map((idea, index) => (
          <IdeaCard key={index} idea={idea} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
