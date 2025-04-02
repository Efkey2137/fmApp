export const loadWonderkidsData = async (
    fetchCsvData: (file: string, callback: (data: any) => void) => Promise<void>,
    setData: (data: any[]) => void
) => {
    const files = [
        { file: "./Wonderkids.csv" },
    ];
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
