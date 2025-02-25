import React, { useEffect, useState } from "react";
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import useFetch from "../hooks/useFetch";
import useCustomSort from "../hooks/useCustomSort";
import "../css/Wonderkids.css";

const Wonderkids: React.FC = () => {
    const { fetchCsvData } = useFetch();
    const [data, setData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

    useEffect(() => {
        const loadCsvData = async () => {
            const files = [
                { file: "./Wonderkids.csv" },
            ];
            let combinedData: any[] = [];

            for (const { file } of files) {
                await fetchCsvData(file, (parsedData) => {
                    if (Array.isArray(parsedData)) {
                        const cleanedData = parsedData.filter(row => row && Object.keys(row).length > 0);

                        // Mapowanie potencjału na odpowiednią kategorię, ale nie dodawanie jej do tabeli
                        const mappedData = cleanedData.map(item => {
                            const potential = item.Potential; // Zakładając, że mamy pole "Potential"
                            let potentialCategory = "";

                            switch (potential) {
                                case "170":
                                    potentialCategory = "World Class";
                                    break;
                                case "160":
                                    potentialCategory = "Top in Top Leagues";
                                    break;
                                case "150":
                                    potentialCategory = "Good in Top Leagues";
                                    break;
                                case "140":
                                    potentialCategory = "Top in Good Leagues";
                                    break;
                                default:
                                    potentialCategory = "Unknown Potential";
                                    break;
                            }

                            // Nie dodajemy PotentialCategory do tabeli
                            return { ...item };
                        });

                        combinedData = [...combinedData, ...mappedData];
                    } else {
                        console.error(`Parsed data from ${file} is not an array:`, parsedData);
                    }
                });
            }
            setData(combinedData);

            // Ustawienie domyślnego sortowania po potencjale, tylko przy pierwszym załadowaniu danych
            if (!sortConfig) {
                setSortConfig({ key: "Potential", direction: "asc" });
            }
        };

        loadCsvData();
    }, [fetchCsvData, sortConfig]);

    const formatHeader = (header: string): string => header.replace(/_/g, " ").toUpperCase();

    const sortData = (data: any[]): any[] => {
        if (!sortConfig) return data;
        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    };

    const handleSort = (key: string): void => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig?.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const filterData = (data: any[]): any[] => {
        return data.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    };

    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    const sortedFilteredData = sortData(filterData(data));

    return (
        <div className="wonderkids">
            <h1>Wonderkids – The Future Stars of Football</h1>
            <p>This section features a list of the most talented young players recognized as wonderkids...</p>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-box"
            />
            {sortedFilteredData.length > 0 ? (
                <table className="wonderkids-table">
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                // Usuwamy dodawanie ostatniej kolumny (PotentialCategory) z tabeli
                                <th key={header} onClick={() => handleSort(header)} className="sortable-header">
                                    <span>{formatHeader(header)}</span>
                                    {sortConfig?.key === header ? (sortConfig.direction === "asc" ? <ArrowBigDown /> : <ArrowBigUp />) : ""}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedFilteredData.map((wonderkid, index) => (
                            <tr key={index}>
                                {headers.map((header) => (
                                    <td key={header}>{wonderkid[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No results found...</p>
            )}
        </div>
    );
};

export default Wonderkids;
