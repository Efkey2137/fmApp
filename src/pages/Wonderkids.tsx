import React, { useEffect, useState } from "react";
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import useFetch from "../hooks/useFetch";
import useCustomSort from "../hooks/useCustomSort";

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
        <div className=" flex flex-col w-full text-center overflow-x-hidden">
            <h1 className="text-3xl md:text-4xl mt-8 font-black">
                Wonderkids – The Future Stars of Football
            </h1>
            
            <p className="text-base mt-4 text-center">
                This section features a list of the most talented young players recognized as wonderkids...
            </p>
            
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 mt-8 border border-primary rounded-md
                         bg-[#1b1b1b] text-gray-200
                         outline-none transition-all duration-300
                         focus:border-primary-hover"
            />

            {sortedFilteredData.length > 0 ? ( 
                <div className="overflow-x-auto mt-20 w-full scrollbar">
                    <table className="w-full border-collapse text-left select-text">
                        <thead>
                            <tr>
                                {headers.map((header) => ( 
                                    <th 
                                        key={header} 
                                        onClick={() => handleSort(header)}
                                        className="bg-primary px-4 py-4 text-left min-w-[61px] 
                                                 cursor-pointer hover:bg-primary-hover
                                                 text-gray-100 transition-colors duration-300"
                                    >
                                        <span>{formatHeader(header)}</span> 
                                        {sortKey === header ? (
                                            <span className="ml-1">
                                                {sortDirection === "asc" ? "▲" : "▼"}
                                            </span>
                                        ) : null} 
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedFilteredData.map((wonderkid, index) => ( 
                                <tr 
                                    key={index}
                                    className={`
                                        transition-colors duration-200
                                        hover:bg-[#393046] cursor-pointer
                                        ${index % 2 === 0 ? 'bg-[#1b1b1b]' : 'bg-[#222031]'}
                                    `}
                                >
                                    {headers.map((header) => (
                                        <td key={header} className="p-4 border-b border-[#393046]">
                                            {wonderkid[header]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-left mt-4">No results found...</p>
            )}
        </div>
    );
};

export default Wonderkids;
