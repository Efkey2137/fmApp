import { useState } from "react";
import { useDropzone } from "react-dropzone";
import PlayerRatingEngine from "../utils/PlayerRatingEngine";
import "../App.css";
import "../css/RatePlayer.css";

const RatePlayer = () => {
  // Define static attributes
  const staticAttributes = [
    // Technical Attributes
    { category: "Technical", name: "Długie wrzuty", value: 0 },
    { category: "Technical", name: "Dośrodkowania", value: 0 },
    { category: "Technical", name: "Drybling", value: 0 },
    { category: "Technical", name: "Gra głową", value: 0 },
    { category: "Technical", name: "Krycie", value: 0 },
    { category: "Technical", name: "Odbiór piłki", value: 0 },
    { category: "Technical", name: "Podania", value: 0 },
    { category: "Technical", name: "Przyjęcie piłki", value: 0 },
    { category: "Technical", name: "Rzuty karne", value: 0 },
    { category: "Technical", name: "Rzuty rożne", value: 0 },
    { category: "Technical", name: "Rzuty wolne", value: 0 },
    { category: "Technical", name: "Strzały z dystansu", value: 0 },
    { category: "Technical", name: "Technika", value: 0 },
    { category: "Technical", name: "Wykańczanie akcji", value: 0 },

    // Psychical Attributes 
    { category: "Psychical", name: "Agresja", value: 0 },
    { category: "Psychical", name: "Błyskotliwość", value: 0 },
    { category: "Psychical", name: "Decyzje", value: 0 },
    { category: "Psychical", name: "Determinacja", value: 0 },
    { category: "Psychical", name: "Gra bez piłki", value: 0 },
    { category: "Psychical", name: "Koncentracja", value: 0 },
    { category: "Psychical", name: "Opanowanie", value: 0 },
    { category: "Psychical", name: "Pracowitość", value: 0 },
    { category: "Psychical", name: "Przegląd sytuacji", value: 0 },
    { category: "Psychical", name: "Przewidywanie", value: 0 },
    { category: "Psychical", name: "Przywództwo", value: 0 },
    { category: "Psychical", name: "Ustawianie się", value: 0 },
    { category: "Psychical", name: "Waleczność", value: 0 },
    { category: "Psychical", name: "Współpraca", value: 0 },

    // Physical Attributes
    { category: "Physical", name: "Przyspieszenie", value: 0 },
    { category: "Physical", name: "Równowaga", value: 0 },
    { category: "Physical", name: "Siła", value: 0 },
    { category: "Physical", name: "Skoczność", value: 0 },
    { category: "Physical", name: "Sprawność", value: 0 },
    { category: "Physical", name: "Szybkość", value: 0 },
    { category: "Physical", name: "Wytrzymałość", value: 0 },
    { category: "Physical", name: "Zwinność", value: 0 },
  ];

  const [attributes, setAttributes] = useState(staticAttributes);
  const [loading, setLoading] = useState(false);
  const [playerRating, setPlayerRating] = useState<number | null>(null);

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

        // Update static attributes with values from the file
        const updatedAttributes = staticAttributes.map((attr, index) => ({
          ...attr,
          value: extractedValues[index] || attr.value // Assign by index, keep default if not found
        }));

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
    const rating = ratingEngine.calculateRating(attributes);
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
        <p>Przeciągnij i upuść plik RTF z FM, lub kliknij, aby go wybrać.</p>
      </div>
      {loading && <p>⏳ Przetwarzanie pliku...</p>}

      {playerRating !== null && (
        <div className="rating-display">
          <h2>Rating gracza: {playerRating}</h2>
        </div>
      )}

      {attributes.length > 0 && (
        <div className="attributes-container">
          {['Technical', 'Psychical', 'Physical'].map(category => (
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
                        value={attr.value} 
                        onChange={(e) => handleValueChange(attr.name, parseInt(e.target.value, 10))} 
                      />
                    </li>
                  ))}
              </ul>
              {category === 'Physical' && ( 
                <button
                  className="calculate-button"
                  onClick={calculatePlayerRating}
                >
                  Oblicz rating
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatePlayer;

