import React, {useEffect} from "react";
import { useCsvReader } from '../hooks/useCsvReader';
import FAQAccordion from '../components/FAQAccordion';

interface FaqCsvItem {
  Polski: string;
  Angielski: string;
  Odpowiedź: string;
}


const FAQ: React.FC = () => {
  const { data, loading, error, parseRemoteFile } = useCsvReader<FaqCsvItem>();

  useEffect(() => {
    // Ścieżka do pliku CSV w folderze public
    parseRemoteFile('/askmngr_faq.csv');
  }, [parseRemoteFile]);

  const faqItems = data.map(item => ({
    question: item.Polski, // lub item.Angielski w zależności od preferencji języka
    answer: item.Odpowiedź
  }));

  if (loading) return <div>Ładowanie danych FAQ...</div>;
  if (error) return <div>Błąd podczas ładowania FAQ: {error.message}</div>;

  return (
    <div className="faq-container">
      <h1>Często zadawane pytania</h1>
      {faqItems.length > 0 ? (
        <FAQAccordion items={faqItems} />
      ) : (
        <p>Brak dostępnych pytań FAQ</p>
      )}
    </div>
  );
};

export default FAQ;
