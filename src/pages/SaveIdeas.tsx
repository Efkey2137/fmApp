import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import PageHeader from "../components/shared/PageHeader";
import CategorySection from "./SaveIdeasComponents/CategorySection";
import { loadCsvData } from "../utils/dataUtils";

const SaveIdeas: React.FC = () => {
  const { fetchCsvData } = useFetch();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadCsvData("./SaveIdeas.csv", fetchCsvData, setData);
  }, [fetchCsvData]);

  const groupByCategory = (data: any[]) => {
    return data.reduce((acc, item) => {
      const category = item.category || "Uncategorized"; // Default category if missing
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, any[]>);
  };

  const groupedData = groupByCategory(data);

  return (
    <div className="container mx-auto p-8">
      <PageHeader title="Save Ideas" />
      
      {Object.entries(groupedData).map(([category, items]) => (
        <CategorySection 
          key={category}
          category={category} 
          items={items as any[]} // Dodana asercja typu
        />
      ))}
    </div>
  );
};

export default SaveIdeas;
