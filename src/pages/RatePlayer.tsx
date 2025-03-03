import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PlayerRatingEngine from "../utils/PlayerRatingEngine";
import { staticAttributes } from "../data/StaticAttributes";  // Zaimportowanie staticAttributes
import "../App.css";
import "../css/RatePlayer.css";

const RatePlayer = () => {
  const GK_ATTRIBUTES = [
    "Reflexes", "One on Ones", "Jumping Reach", "Aerial Reach", "Positioning", "Decisions"
  ];
  const CB_ATTRIBUTES = [
    "Jumping Reach", "Tackling", "Composure", "Concentration", "Strength"
  ];
  const FB_ATTRIBUTES = [
    "Work Rate", "Stamina", "Positioning", "Crossing", "Technique", "Marking", "Determination"
  ];
  const DM_ATTRIBUTES = [
    "First Touch", "Teamwork", "Composure", "Positioning", "Passing", "Tackling"
  ];
  const CM_ATTRIBUTES = [
    "Work Rate", "Stamina", "Passing", "Decisions"
  ];
  const AM_ATTRIBUTES = [
    "Vision", "Flair", "First Touch", "Off The Ball", "Technique"
  ];
  const WING_ATTRIBUTES = [
    "Agility", "Dribbling", "Balance", "Flair", "Technique"
  ];
  const ST_ATTRIBUTES = [
    "Off The Ball", "Composure", "Determination", "First Touch", "Finishing"
  ];

  // Define static attributes
  
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
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});
  const [showPositions, setShowPositions] = useState(false);
  const [inputPosition, setInputPosition] = useState('');

  useEffect(() => {
    calculatePlayerRating();
  }, [attributes, selectedPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.position-input-container')) {
            setShowPositions(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

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

  const handleValueChange = (name: string, value: string) => {
    // Update the input value immediately
    setInputValues(prev => ({...prev, [name]: value}));
  };

  const handleBlur = (name: string, value: string) => {
    // Validate and update the actual attribute value when input loses focus
    const numValue = parseInt(value, 10);
    const validValue = Math.max(1, Math.min(20, numValue || 1));
    
    const updatedAttributes = [...attributes];
    const index = updatedAttributes.findIndex(attr => attr.name === name);
    if (index !== -1) {
      updatedAttributes[index].value = validValue;
      setAttributes(updatedAttributes);
      // Update input value to show the validated number
      setInputValues(prev => ({...prev, [name]: validValue.toString()}));
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

  const isPositionAttribute = (attributeName: string) => {
    switch(selectedPosition) {
      case 'GK': return GK_ATTRIBUTES.includes(attributeName);
      case 'CB': return CB_ATTRIBUTES.includes(attributeName);
      case 'FB': return FB_ATTRIBUTES.includes(attributeName);
      case 'DM': return DM_ATTRIBUTES.includes(attributeName);
      case 'CM': return CM_ATTRIBUTES.includes(attributeName);
      case 'AM': return AM_ATTRIBUTES.includes(attributeName);
      case 'WING': return WING_ATTRIBUTES.includes(attributeName);
      case 'ST': return ST_ATTRIBUTES.includes(attributeName);
      default: return false;
    }
  };

  const handlePositionSelect = (position: { name: string, sc: string }) => {
    setInputPosition(position.name);
    setSelectedPosition(position.sc);
    setShowPositions(false);

    // Get previous position type (GK or field player)
    const wasGoalkeeper = selectedPosition === 'GK';
    const isGoalkeeper = position.sc === 'GK';

    // Only reset attributes when switching between GK and field player or vice versa
    if (wasGoalkeeper !== isGoalkeeper) {
        // Reset all attributes to 0
        const updatedAttributes = attributes.map(attr => ({
            ...attr,
            value: 0
        }));
        
        setAttributes(updatedAttributes);
        setInputValues({}); // Reset input values
    }
};

  return (
    <div className="dropzone-container">
        <div className="controls-container">
            <div {...getRootProps()} className="dropzone-area">
                <input {...getInputProps()} />
                <p>Drag and drop the RTF file from FM, or click to select it.</p>
            </div>

            {playerRating !== null && (
                <div className={`rating-display ${
                    playerRating >= 85 ? 'rating-border-gold' :
                    playerRating >= 75 ? 'rating-border-green' :
                    playerRating >= 65 ? 'rating-border-blue' :
                    playerRating >= 55 ? 'rating-border-orange' :
                    playerRating >= 45 ? 'rating-border-yellow' :
                    playerRating >= 35 ? 'rating-border-red' :
                    'rating-border-purple'
                }`}>
                    <h2 className={`${
                        playerRating >= 85 ? 'rating-gold' :
                        playerRating >= 75 ? 'rating-green' :
                        playerRating >= 65 ? 'rating-blue' :
                        playerRating >= 55 ? 'rating-orange' :
                        playerRating >= 45 ? 'rating-yellow' :
                        playerRating >= 35 ? 'rating-red' :
                        'rating-purple'
                    }`}>
                        Player rating: {playerRating}
                    </h2>
                </div>
            )}

            <div className="position-input-container">
                <input
                    className="position-input"
                    type="text"
                    placeholder="Select position"
                    value={inputPosition}
                    onChange={(e) => setInputPosition(e.target.value)}
                    onFocus={() => setShowPositions(true)}
                    readOnly
                />
                {showPositions && (
                    <div className="positions-dropdown">
                        {Positions.map((position) => (
                            <div
                                key={position.sc}
                                className="position-option"
                                onClick={() => handlePositionSelect(position)}
                            >
                                {position.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {loading && <p>⏳ Przetwarzanie pliku...</p>}

        {attributes.length > 0 && (
        <div className="attributes-container">
            {selectedPosition === 'GK' ? (
            <div className="attribute-category">
            <h3 className="category-title">Goalkeeping</h3>
            <ul>
            {attributes
                .filter(attr => attr.category === 'Goalkeeping')
                .map((attr) => (
                <li 
                key={attr.name}
                className={`attribute-item ${isPositionAttribute(attr.name) ? 'highlighted' : ''}`}
                >
                <label>{attr.name}</label>
                <input
                    type="number"
                    min="1"
                    max="20"
                    value={inputValues[attr.name] ?? attr.value}
                    onChange={(e) => handleValueChange(attr.name, e.target.value)}
                    onBlur={(e) => handleBlur(attr.name, e.target.value)}
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
                <li 
                key={attr.name}
                className={`attribute-item ${isPositionAttribute(attr.name) ? 'highlighted' : ''}`}
                >
                <label>{attr.name}</label>
                <input
                    type="number"
                    min="1"
                    max="20"
                    value={inputValues[attr.name] ?? attr.value}
                    onChange={(e) => handleValueChange(attr.name, e.target.value)}
                    onBlur={(e) => handleBlur(attr.name, e.target.value)}
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
                <li 
                key={attr.name}
                className={`attribute-item ${isPositionAttribute(attr.name) ? 'highlighted' : ''}`}
                >
                <label>{attr.name}</label>
                <input
                    type="number"
                    min="1"
                    max="20"
                    value={inputValues[attr.name] ?? attr.value}
                    onChange={(e) => handleValueChange(attr.name, e.target.value)}
                    onBlur={(e) => handleBlur(attr.name, e.target.value)}
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
