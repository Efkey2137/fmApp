import React, { useState } from 'react';

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
    <div className="max-w-[1200px] mx-auto p-4 md:p-8">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="mb-4 border border-border-color rounded-xl overflow-hidden 
                     bg-[#151515] shadow-md"
        >
          <button
            className={`w-full p-4 md:p-6 text-left cursor-pointer
                       flex justify-between items-center
                       text-base md:text-lg font-medium
                       transition-all duration-400 ease-in-out
                       hover:bg-[#393046] hover:-translate-y-[1px]
                       ${openIndex === index 
                         ? 'bg-primary text-white' 
                         : 'bg-[#1b1b1b] text-gray-200'}`}
            onClick={() => toggleItem(index)}
          >
            {item.question}
            <span className={`ml-4 text-xl font-bold transition-transform duration-400
                            ${openIndex === index ? 'rotate-180' : ''}`}>
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          
          {openIndex === index && (
            <div className="p-4 md:p-6 bg-[#1b1b1b] text-gray-200 border-t border-border-color
                          leading-relaxed animate-slideDown">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
