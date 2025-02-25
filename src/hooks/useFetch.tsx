import Papa from 'papaparse';

type Callback = (data: any) => void;

const useFetch = () => {

    // Function to map potential values to categories
    const mapPotentialToCategory = (data: any[]) => {
        return data.map(item => {
            const potential = parseInt(item.potential); // Assuming 'potential' is the key after sanitization
            let potentialCategory = "";

            switch (potential) {
                case 170:
                    potentialCategory = "World Class";
                    break;
                case 160:
                    potentialCategory = "Top in Top Leagues";
                    break;
                case 150:
                    potentialCategory = "Good in Top Leagues";
                    break;
                case 140:
                    potentialCategory = "Top in Good Leagues";
                    break;
                default:
                    potentialCategory = "Unknown Potential";
                    break;
            }

            return { ...item, potential: potentialCategory }; // Update the potential field with the category
        });
    };

    // Function to sanitize column names
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
            const categorizedData = mapPotentialToCategory(sanitizedData); // Map potential values to categories
            callback(categorizedData);
        } catch (error) {
            console.error("Error fetching CSV:", error);
        }
    };

    return { fetchCsvData };
};

export default useFetch;
