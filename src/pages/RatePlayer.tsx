import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PlayerRatingEngine from "../utils/PlayerRatingEngine";
import "../App.css";
import "../css/RatePlayer.css";

const RatePlayer = () => {
  // Define static attributes
  const staticAttributes = [
    // Goalkeeping Attributes
    { category: "Goalkeeping", name: "Handling", value: 0 },
    { category: "Goalkeeping", name: "Eccentricity", value: 0 },
    { category: "Goalkeeping", name: "Command of Area", value: 0 },
    { category: "Goalkeeping", name: "One on Ones", value: 0 },
    { category: "Goalkeeping", name: "Communication", value: 0 },
    { category: "Goalkeeping", name: "Punching (Tendency)", value: 0 },
    { category: "Goalkeeping", name: "Passing", value: 0 },
    { category: "Goalkeeping", name: "First Touch", value: 0 },
    { category: "Goalkeeping", name: "Reflexes", value: 0 },
    { category: "Goalkeeping", name: "Rushing Out (Tendency)", value: 0 },
    { category: "Goalkeeping", name: "Kicking", value: 0 },
    { category: "Goalkeeping", name: "Throwing", value: 0 },
    { category: "Goalkeeping", name: "Aerial Reach", value: 0 },
    // Technical Attributes
    { category: "Technical", name: "Long Throws", value: 0 },
    { category: "Technical", name: "Crossing", value: 0 },
    { category: "Technical", name: "Dribbling", value: 0 },
    { category: "Technical", name: "Heading", value: 0 },
    { category: "Technical", name: "Marking", value: 0 },
    { category: "Technical", name: "Tackling", value: 0 },
    { category: "Technical", name: "Passing", value: 0 },
    { category: "Technical", name: "First Touch", value: 0 },
    { category: "Technical", name: "Penalty Taking", value: 0 },
    { category: "Technical", name: "Corners", value: 0 },
    { category: "Technical", name: "Free Kick Tacking", value: 0 },
    { category: "Technical", name: "Long Shots", value: 0 },
    { category: "Technical", name: "Technique", value: 0 },
    { category: "Technical", name: "Finishing", value: 0 },
    // Psychical Attributes 
    { category: "Psychical", name: "Aggression", value: 0 },
    { category: "Psychical", name: "Flair", value: 0 },
    { category: "Psychical", name: "Decisions", value: 0 },
    { category: "Psychical", name: "Determination", value: 0 },
    { category: "Psychical", name: "Off The Ball", value: 0 },
    { category: "Psychical", name: "Concentration", value: 0 },
    { category: "Psychical", name: "Composure", value: 0 },
    { category: "Psychical", name: "Work Rate", value: 0 },
    { category: "Psychical", name: "Vision", value: 0 },
    { category: "Psychical", name: "Anticipation", value: 0 },
    { category: "Psychical", name: "Leadership", value: 0 },
    { category: "Psychical", name: "Positioning", value: 0 },
    { category: "Psychical", name: "Bravery", value: 0 },
    { category: "Psychical", name: "Teamwork", value: 0 },
    // Physical Attributes
    { category: "Physical", name: "Acceleration", value: 0 },
    { category: "Physical", name: "Balance", value: 0 },
    { category: "Physical", name: "Strength", value: 0 },
    { category: "Physical", name: "Jumping Reach", value: 0 },
    { category: "Physical", name: "Natural Fitness", value: 0 },
    { category: "Physical", name: "Pace", value: 0 },
    { category: "Physical", name: "Stamina", value: 0 },
    { category: "Physical", name: "Agility", value: 0 },
  ];

  const Positions = [
    { name: "Goalkeeper", sc: "GK" },
    { name: "Centre Back", sc: "CB" },
    { name: "Full Back", sc: "FB" },
    { name: "Defensive Midfielder", sc: "DM" },
    { name: "Central Midfielder", sc: "CM" },
    { name: "Attacking Midfielder", sc: "AM" },
    { name: "Winger", sc: "WING" },
    { name: "Striker", sc: "ST" }
  ];

  const [attributes, setAttributes] = useState(staticAttributes);
  const [loading, setLoading] = useState(false);
  const [playerRating, setPlayerRating] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  useEffect(() => {
    calculatePlayerRating();
  }, [attributes, selectedPosition]);

  const onDrop = (acceptedFiles: File[]) => {
    setLoading(true);
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const text = event.target.result as string;
        const regex = /\|\s([\w\sĄąĆćĘęŁłŃńÓóŚśŹźŻż-]+)\s*\|\s*(\d{1,2})\s*\|/g;
        let match;
        const extractedValues: number[] = [];
    
        while ((match = regex.exec(text)) !== null) {
          const value = parseInt(match[2], 10);
          extractedValues.push(value);
        }
    
        let valueIndex = 0; // Indeks dla wartości z extractedValues
    
        const updatedAttributes = staticAttributes.map((attr) => {
          let categoryIndex = valueIndex;
    
          if (selectedPosition === 'GK') {
            // Dla bramkarza (Goalkeeper) 
            if (attr.category === "Goalkeeping" && valueIndex < 13) {
              categoryIndex = valueIndex; 
              valueIndex++;
            } else if (attr.category === "Psychical" && valueIndex >= 13 && valueIndex < 27) {
              categoryIndex = valueIndex;
              valueIndex++;
            } else if (attr.category === "Physical" && valueIndex >= 27) {
              categoryIndex = valueIndex;
              valueIndex++;
            } else {
              return attr; // Pozostaw oryginalną wartość, jeśli nie pasuje do kategorii
            }
          } else {
            // Dla pozostałych pozycji
            if (attr.category === "Technical" && valueIndex < 14) {
              categoryIndex = valueIndex;
              valueIndex++;
            } else if (attr.category === "Psychical" && valueIndex >= 14 && valueIndex < 28) {
              categoryIndex = valueIndex;
              valueIndex++;
            } else if (attr.category === "Physical" && valueIndex >= 28) {
              categoryIndex = valueIndex;
              valueIndex++;
            } else {
              return attr; // Pozostaw oryginalną wartość, jeśli nie pasuje do kategorii
            }
          }
    
          return { ...attr, value: extractedValues[categoryIndex] || attr.value };
        });
    
        setAttributes(updatedAttributes);
        setLoading(false);
      }
    };
    
    
    

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      setLoading(false);
    };

    reader.readAsText(file);
  };

  const handleValueChange = (name: string, newValue: number) => {
    const updatedAttributes = [...attributes];
    const index = updatedAttributes.findIndex(attr => attr.name === name);
    if (index !== -1) {
      updatedAttributes[index].value = newValue;
      setAttributes(updatedAttributes);
    }
  };

  const calculatePlayerRating = () => {
    const ratingEngine = new PlayerRatingEngine();
    const rating = ratingEngine.calculateRating(attributes, selectedPosition);
    setPlayerRating(rating);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/rtf': ['.rtf'],
      'text/plain': ['.txt'],
      'application/rtf': ['.rtf']
    },
    multiple: false
  });

  return (
    <div className="dropzone-container">
      <div {...getRootProps()} className="dropzone-area">
      <input {...getInputProps()} />
      <p>Drag and drop the RTF file from FM, or click to select it.</p>
      </div>
      {loading && <p>⏳ Przetwarzanie pliku...</p>}

      {playerRating !== null && (
      <div className="rating-display">
        <h2>Player rating: {playerRating}</h2>
      </div>
      )}

      <select
      className="positions"
      onChange={(e) => {
        setSelectedPosition(e.target.value);
        calculatePlayerRating();
      }}
      value={selectedPosition}
      >
      <option value="">Select position</option>
      {Positions.map((position) => (
        <option key={position.sc} value={position.sc}>
        {position.name}
        </option>
      ))}
      </select>

      {attributes.length > 0 && (
      <div className="attributes-container">
        {selectedPosition === 'GK' ? (
        <div className="attribute-category">
          <h3 className="category-title">Goalkeeping</h3>
          <ul>
          {attributes
            .filter(attr => attr.category === 'Goalkeeping')
            .map((attr) => (
            <li key={attr.name}>
              <label>{attr.name}</label>
              <input
              type="number"
              min="1"
              max="20"
              value={attr.value}
              onChange={(e) => handleValueChange(attr.name, Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1)))}
              />
            </li>
            ))}
          </ul>
        </div>
        ) : (
        <div className="attribute-category">
          <h3 className="category-title">Technical</h3>
          <ul>
          {attributes
            .filter(attr => attr.category === 'Technical')
            .map((attr) => (
            <li key={attr.name}>
              <label>{attr.name}</label>
              <input
              type="number"
              min="1"
              max="20"
              value={attr.value}
              onChange={(e) => handleValueChange(attr.name, Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1)))}
              />
            </li>
            ))}
          </ul>
        </div>
        )}

        {['Psychical', 'Physical'].map(category => (
        <div key={category} className="attribute-category">
          <h3 className="category-title">{category}</h3>
          <ul>
          {attributes
            .filter(attr => attr.category === category)
            .map((attr) => (
            <li key={attr.name}>
              <label>{attr.name}</label>
              <input
              type="number"
              min="1"
              max="20"
              value={attr.value}
              onChange={(e) => handleValueChange(attr.name, Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1)))}
              />
            </li>
            ))}
          </ul>
        </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default RatePlayer;
