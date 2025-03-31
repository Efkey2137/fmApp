import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";


const SaveIdeas: React.FC = () => {
  const { fetchCsvData } = useFetch();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const loadCsvData = (file: string, setData: React.Dispatch<React.SetStateAction<any[]>>) => {
      fetchCsvData(file, (parsedData) => {
        if (Array.isArray(parsedData)) {
          const cleanedData = parsedData.filter(row => row && Object.keys(row).length > 0);
          setData(cleanedData);
        } else {
          console.error(`Parsed data from ${file} is not an array:`, parsedData);
        }
      });
    };

    loadCsvData("./SaveIdeas.csv", setData);
  }, [fetchCsvData]);

  const formatHeader = (header: string) => header.replace(/_/g, " ").toUpperCase();

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
      <h1 className="text-4xl text-center mb-8 font-black">Save Ideas</h1>
      {Object.entries(groupedData).map(([category, items]) => (
        <div key={category} className="mt-8">
          <h2 className="text-2xl text-center mb-4 font-semibold">{category}</h2>
          <div className="grid grid-cols-1 gap-4">
            {(items as any[]).map((idea, index) => (
              <div 
                key={index} 
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SaveIdeas;
