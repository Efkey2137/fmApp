import React, { useEffect, useState } from "react";
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import useFetch from "../hooks/useFetch";
import useCustomSort from "../hooks/useCustomSort";
import "../css/Wonderkids.css";

const Wonderkids: React.FC = () => {
    const { fetchCsvData } = useFetch();
    const [data, setData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const { sortedData, sortData, sortKey, sortDirection } = useCustomSort(data);

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
                        combinedData = [...combinedData, ...cleanedData];
                    } else {
                        console.error(`Parsed data from ${file} is not an array:`, parsedData);
                    }
                });
            }
            setData(combinedData); 
        };

        loadCsvData();
    }, [fetchCsvData]);

    const formatHeader = (header: string): string => header.replace(/_/g, " ").toUpperCase();

    const handleSort = (key: string): void => {
        sortData(key); 
    };

    const filterData = (data: any[]): any[] => {
        // Special cases for potential ratings
        if (searchQuery === "170") {
            return data.filter(row => row.potential === "World Class");
        }if (searchQuery === "160") {
            return data.filter(row => row.potential === "Top in Top Leagues");
        }if (searchQuery === "150") {
            return data.filter(row => row.potential === "Good in Top Leagues" );
        }if (searchQuery === "140") {
            return data.filter(row => row.potential === "Top in Good Leagues" );
        }

        // Default search behavior
        return data.filter(row => 
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    };

    const headers = data.length > 0 ? Object.keys(data[0]) : []; 
    const sortedFilteredData = filterData(sortedData); 

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
                                <th key={header} onClick={() => handleSort(header)} className="sortable-header">
                                    <span>{formatHeader(header)}</span> 
                                    {sortKey === header ? (sortDirection === "asc" ? " ▲" : " ▼") : ""} 
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
