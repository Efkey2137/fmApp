import { useState } from 'react';
import Papa from 'papaparse';

interface UseCsvReaderOptions {
  header?: boolean;
  dynamicTyping?: boolean;
  skipEmptyLines?: boolean;
}

export function useCsvReader<T = any>(defaultOptions: UseCsvReaderOptions = {}) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const parseFile = (file: File, options: UseCsvReaderOptions = {}) => {
    setLoading(true);
    setError(null);

    const config = {
      ...defaultOptions,
      ...options,
      header: options.header ?? true,
      dynamicTyping: options.dynamicTyping ?? true,
      skipEmptyLines: options.skipEmptyLines ?? true,
      complete: (results: Papa.ParseResult<T>) => {
        setData(results.data);
        setLoading(false);
      },
      error: (error: Error) => {
        setError(error);
        setLoading(false);
      }
    };

    Papa.parse(file, config);
  };

  const parseString = (csvString: string, options: UseCsvReaderOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        ...defaultOptions,
        ...options,
        header: options.header ?? true,
        dynamicTyping: options.dynamicTyping ?? true,
        skipEmptyLines: options.skipEmptyLines ?? true,
      };

      const results = Papa.parse<T>(csvString, config);
      setData(results.data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Nieznany błąd podczas parsowania CSV'));
      setLoading(false);
    }
  };

  const parseRemoteFile = (url: string, options: UseCsvReaderOptions = {}) => {
    setLoading(true);
    setError(null);

    const config = {
      ...defaultOptions,
      ...options,
      header: options.header ?? true,
      dynamicTyping: options.dynamicTyping ?? true,
      skipEmptyLines: options.skipEmptyLines ?? true,
      download: true,
      complete: (results: Papa.ParseResult<T>) => {
        setData(results.data);
        setLoading(false);
      },
      error: (error: Error) => {
        setError(error);
        setLoading(false);
      }
    };

    Papa.parse<T>(url, config as Papa.ParseRemoteConfig<T>);
  };

  return {
    data,
    error,
    loading,
    parseFile,
    parseString,
    parseRemoteFile
  };
}
