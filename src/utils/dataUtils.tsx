// src/utils/dataUtils.ts

/**
 * Ładuje dane z pliku CSV i przetwarza je
 * @param file Ścieżka do pliku CSV
 * @param fetchCsvData Funkcja do pobierania danych CSV
 * @param setData Funkcja do ustawiania danych w komponencie
 */
export const loadCsvData = async (
    file: string,
    fetchCsvData: (file: string, callback: (data: any) => void) => Promise<void>,
    setData: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    await fetchCsvData(file, (parsedData) => {
      if (Array.isArray(parsedData)) {
        const cleanedData = parsedData.filter(row => row && Object.keys(row).length > 0);
        setData(cleanedData);
      } else {
        console.error(`Parsed data from ${file} is not an array:`, parsedData);
      }
    });
  };
  
  /**
   * Ładuje dane z wielu plików CSV i łączy je
   * @param files Tablica obiektów z nazwami plików
   * @param fetchCsvData Funkcja do pobierania danych CSV
   * @param setData Funkcja do ustawiania danych w komponencie
   */
  export const loadMultipleCsvData = async (
    files: { file: string }[],
    fetchCsvData: (file: string, callback: (data: any) => void) => Promise<void>,
    setData: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    let combinedData: any[] = [];
  
    for (const { file } of files) {
      await fetchCsvData(file, (parsedData) => {
        if (Array.isArray(parsedData)) {
          const cleanedData = parsedData.filter(row => row && Object.keys(row).length > 0);
          combinedData = [...combinedData, ...cleanedData];
        } else {
          console.error(`Parsed data from ${file} is not an array:`, parsedData);
        }
      });
    }
    
    setData(combinedData);
  };
  
  /**
   * Formatuje nagłówek tabeli
   * @param header Tekst nagłówka
   * @returns Sformatowany tekst nagłówka
   */
  export const formatHeader = (header: string): string => {
    return header.replace(/_/g, " ").toUpperCase();
  };
  