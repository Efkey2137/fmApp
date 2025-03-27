import { useState } from 'react';

export const useFileUpload = (setHtmlContent: (content: string) => void) => {
  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setHtmlContent(content);
      };
      reader.readAsText(file);
    }
  };

  return { uploadFile };
};
