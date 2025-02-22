import Papa from 'papaparse';

type Callback = (data: any) => void;

const useFetch = () => {

    // Poprawiona funkcja, która nie pozostawia oryginalnych kluczy
    const sanitizeColumns = (data: any) => {
        return data.map((item: any) => {
            const sanitizedItem: any = {};
            Object.keys(item).forEach(key => {
                const sanitizedKey = key.toLowerCase().replace(/(\s|-)/g, "_");
                sanitizedItem[sanitizedKey] = item[key];
            });
            return sanitizedItem;
        });
    };

    const fetchCsvData = async (filePath: string, callback: Callback) => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const reader = response.body!.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csvString = decoder.decode(result.value!);
            
            const { data } = Papa.parse(csvString, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true
            });

            const sanitizedData = sanitizeColumns(data);
            callback(sanitizedData);
        } catch (error) {
            console.error("Error fetching CSV:", error);
        }
    };

    return { fetchCsvData };
};

export default useFetch;
