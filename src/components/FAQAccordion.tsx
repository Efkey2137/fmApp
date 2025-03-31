import React, { useState } from 'react';
import '../css/Accordion.css'; // Import your CSS styles here

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion">
      {items.map((item, index) => (
        <div key={index} className="faq-item">
          <button
            className={`faq-question ${openIndex === index ? 'active' : ''}`}
            onClick={() => toggleItem(index)}
          >
            {item.question}
            <span className="faq-icon">{openIndex === index ? '-' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
