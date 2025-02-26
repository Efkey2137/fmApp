import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";
import vision from "@google-cloud/vision";
import "../App.css"
import "../css/RatePlayer.css";

const RatePlayer = () => {
  const [attributes, setAttributes] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setLoading(true);
    const file = acceptedFiles[0];

    Tesseract.recognize(file, "pol")
      .then(({ data }) => {
        const text = data.text;
        console.log("OCR Output:", text);

        // Regex dla atrybutów i wartości 1-20
        const regex = /([A-Za-z\s]+)\s(\d{1,2})/g;
        const extractedAttributes: { name: string; value: number }[] = [];
        
        let match;
        while ((match = regex.exec(text)) !== null) {
          const name = match[1].trim();
          const value = parseInt(match[2], 10);
          if (value >= 1 && value <= 20) {
            extractedAttributes.push({ name, value });
          }
        }

        setAttributes(extractedAttributes);
      })
      .finally(() => setLoading(false));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="dropzone-container">
      <div {...getRootProps()} className="dropzone-area">
        <input {...getInputProps()} />
        <p>Przeciągnij i upuść screenshota z FM, lub kliknij, aby go wybrać.</p>
      </div>

      {loading && <p>⏳ Przetwarzanie obrazu...</p>}

      {attributes.length > 0 && (
        <div className="attributes-container">
          <h2 className="attributes-title">Atrybuty:</h2>
          <ul>
            {attributes.map((attr, index) => (
              <li key={index} className="attribute-item">
                <span className="attribute-name">{attr.name}</span>: {attr.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RatePlayer;
