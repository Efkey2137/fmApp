import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import "../css/SaveIdeas.css";

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
    <div className="save-ideas">
      <h1>Save Ideas</h1>
      {Object.entries(groupedData).map(([category, items]) => (
        <div key={category} className="save-ideas-category">
          <h2>{category}</h2>
          <div className="save-idea">
            {(items as any[]).map((idea, index) => (
              <div key={index} className="save-idea-item">
                <h3 className="title">{idea.club} - {idea.league}</h3>
                <p>{idea.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SaveIdeas;
