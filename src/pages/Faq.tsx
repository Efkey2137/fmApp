import React, { useEffect } from "react";
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
    parseRemoteFile('/askmngr_faq.csv');
  }, []); // Remove parseRemoteFile from dependencies to prevent infinite loop

  const faqItems = data?.map(item => ({
    question: item.Polski,
    answer: item.Odpowiedź
  })) || [];

  return (
    <div className="max-w-[1400px] mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary">
        Często zadawane pytania
      </h1>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 text-center bg-red-100/10 rounded-lg">
          Błąd podczas ładowania FAQ: {error.message}
        </div>
      ) : faqItems.length > 0 ? (
        <FAQAccordion items={faqItems} />
      ) : (
        <p className="text-center text-gray-400 p-4">
          Brak dostępnych pytań FAQ
        </p>
      )}
    </div>
  );
};

export default FAQ;
