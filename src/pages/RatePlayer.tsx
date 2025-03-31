import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PlayerRatingEngine from "../utils/PlayerRatingEngine";
import { staticAttributes } from "../data/StaticAttributes";
import "../App.css";
// import "../css/RatePlayer.css";

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
        if (!target.closest('.position-selector')) {
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
    
        let valueIndex = 0;
    
        const updatedAttributes = staticAttributes.map((attr) => {
          let categoryIndex = valueIndex;
    
          if (selectedPosition === 'GK') {
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
              return attr;
            }
          } else {
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
              return attr;
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
    setInputValues(prev => ({...prev, [name]: value}));
  };

  const handleBlur = (name: string, value: string) => {
    const numValue = parseInt(value, 10);
    const validValue = Math.max(1, Math.min(20, numValue || 1));
    
    const updatedAttributes = [...attributes];
    const index = updatedAttributes.findIndex(attr => attr.name === name);
    if (index !== -1) {
      updatedAttributes[index].value = validValue;
      setAttributes(updatedAttributes);
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

    const wasGoalkeeper = selectedPosition === 'GK';
    const isGoalkeeper = position.sc === 'GK';

    if (wasGoalkeeper !== isGoalkeeper) {
        const updatedAttributes = attributes.map(attr => ({
            ...attr,
            value: 0
        }));
        
        setAttributes(updatedAttributes);
        setInputValues({});
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-8 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 w-full">
        <div 
          {...getRootProps()} 
          className="flex items-center justify-center w-full h-[100px] border-2 border-dashed border-primary 
                     rounded-xl bg-gradient-to-br from-bg-dark to-bg-darker cursor-pointer 
                     transition-all duration-300 hover:border-opacity-70"
        >
          <input {...getInputProps()} />
          <p className="text-text-light text-lg text-center p-4">
            Drag and drop the RTF file from FM, or click to select it.
          </p>
        </div>

        {playerRating !== null && (
          <div className={`flex items-center justify-center w-full h-[100px] rounded-xl 
                          bg-gradient-to-br from-bg-dark to-bg-darker
                          ${playerRating >= 85 ? 'border-2 border-rating-gold' :
                            playerRating >= 75 ? 'border-2 border-rating-green' :
                            playerRating >= 65 ? 'border-2 border-rating-blue' :
                            playerRating >= 55 ? 'border-2 border-rating-orange' :
                            playerRating >= 45 ? 'border-2 border-rating-yellow' :
                            playerRating >= 35 ? 'border-2 border-rating-red' :
                            'border-2 border-rating-purple'}`}
          >
            <h2 className={`text-2xl font-semibold
                           ${playerRating >= 85 ? 'text-rating-gold' :
                             playerRating >= 75 ? 'text-rating-green' :
                             playerRating >= 65 ? 'text-rating-blue' :
                             playerRating >= 55 ? 'text-rating-orange' :
                             playerRating >= 45 ? 'text-rating-yellow' :
                             playerRating >= 35 ? 'text-rating-red' :
                             'text-rating-purple'}`}
            >
              Player rating: {playerRating}
            </h2>
          </div>
        )}

        <div className="relative w-full h-[100px] position-selector">
          <input
            type="text"
            placeholder="Select position"
            value={inputPosition}
            onClick={() => setShowPositions(!showPositions)}
            readOnly
            className="w-full h-full border-2 border-border-color rounded-xl
                       bg-gradient-to-br from-bg-dark to-bg-darker text-text-light
                       text-xl text-center cursor-pointer px-4
                       focus:outline-none focus:border-primary transition-colors duration-300"
          />
          {showPositions && (
            <div className="absolute top-full left-0 right-0 mt-2 
                        bg-[#1b1b1b] border border-border-color rounded-lg 
                        shadow-lg z-50 grid grid-cols-2 gap-0.5 p-1">
              {Positions.map((position) => (
                <div
                  key={position.sc}
                  onClick={() => handlePositionSelect(position)}
                  className="p-3 text-text-light text-base font-medium
                           bg-[#222031] rounded-md
                           hover:bg-primary/10 hover:text-primary
                           transition-all duration-200 cursor-pointer
                           flex items-center justify-center"
                >
                  {position.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading && <p className="text-center text-primary text-lg">⏳ Processing file...</p>}

      {attributes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
          {selectedPosition === 'GK' ? (
            <div className="bg-gradient-to-br from-bg-dark to-bg-darker rounded-xl p-6 border border-border-color">
              <h3 className="text-xl text-primary mb-3 pb-3 border-b-2 border-border-color">
                Goalkeeping
              </h3>
              <ul className="space-y-2">
                {attributes
                  .filter(attr => attr.category === 'Goalkeeping')
                  .map((attr) => (
                    <li key={attr.name} 
                        className={`flex items-center justify-between p-2
                                  ${isPositionAttribute(attr.name) ? 
                                    'bg-gradient-to-r from-primary/10 to-transparent border-l-3 border-primary pl-4' : ''}`}>
                      <label className="text-text-light text-lg flex-1">{attr.name}</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={inputValues[attr.name] ?? attr.value}
                        onChange={(e) => handleValueChange(attr.name, e.target.value)}
                        onBlur={(e) => handleBlur(attr.name, e.target.value)}
                        className="w-[60px] p-2 border border-border-color rounded-md bg-bg-darker text-text-light 
                                 text-lg text-center focus:outline-none focus:border-primary
                                 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                 [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-bg-dark to-bg-darker rounded-xl p-6 border border-border-color">
              <h3 className="text-xl text-primary mb-3 pb-3 border-b-2 border-border-color">
                Technical
              </h3>
              <ul className="space-y-2">
                {attributes
                  .filter(attr => attr.category === 'Technical')
                  .map((attr) => (
                    <li key={attr.name} 
                        className={`flex items-center justify-between p-2
                                  ${isPositionAttribute(attr.name) ? 
                                    'bg-gradient-to-r from-primary/10 to-transparent border-l-3 border-primary pl-4' : ''}`}>
                      <label className="text-text-light text-lg flex-1">{attr.name}</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={inputValues[attr.name] ?? attr.value}
                        onChange={(e) => handleValueChange(attr.name, e.target.value)}
                        onBlur={(e) => handleBlur(attr.name, e.target.value)}
                        className="w-[60px] p-2 border border-border-color rounded-md bg-bg-darker text-text-light 
                                 text-lg text-center focus:outline-none focus:border-primary
                                 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                 [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {['Psychical', 'Physical'].map(category => (
            <div key={category} className="bg-gradient-to-br from-bg-dark to-bg-darker rounded-xl p-6 border border-border-color">
              <h3 className="text-xl text-primary mb-3 pb-3 border-b-2 border-border-color">
                {category}
              </h3>
              <ul className="space-y-2">
                {attributes
                  .filter(attr => attr.category === category)
                  .map((attr) => (
                    <li key={attr.name} 
                        className={`flex items-center justify-between p-2
                                  ${isPositionAttribute(attr.name) ? 
                                    'bg-gradient-to-r from-primary/10 to-transparent border-l-3 border-primary pl-4' : ''}`}>
                      <label className="text-text-light text-lg flex-1">{attr.name}</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={inputValues[attr.name] ?? attr.value}
                        onChange={(e) => handleValueChange(attr.name, e.target.value)}
                        onBlur={(e) => handleBlur(attr.name, e.target.value)}
                        className="w-[60px] p-2 border border-border-color rounded-md bg-bg-darker text-text-light 
                                 text-lg text-center focus:outline-none focus:border-primary
                                 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                 [&::-webkit-inner-spin-button]:appearance-none"
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
