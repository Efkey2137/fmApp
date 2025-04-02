// src/components/shared/PageHeader.tsx
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  className = "" 
}) => {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-3xl md:text-4xl font-black mb-4">{title}</h1>
      {description && <p className="text-base mt-2">{description}</p>}
    </div>
  );
};

export default PageHeader;
