import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../App.css"
import "../css/RatePlayer.css";

const RatePlayer = () => {
  const [attributes, setAttributes] = useState<{ name: string; value: number }[]>([]);
  const [rawText, setRawText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setLoading(true);
    const file = acceptedFiles[0];
    
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const text = event.target.result as string;
        
        // Set the raw text content
        setRawText(text);
        
        // Keep the existing attribute extraction logic
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
        setLoading(false);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      setLoading(false);
    };

    reader.readAsText(file);
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

      {/* Display raw text content */}
      {rawText && (
        <div className="raw-text-container">
          <h2>Raw Text Content:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', maxWidth: '100%', overflow: 'auto' }}>
            {rawText}
          </pre>
        </div>
      )}

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
