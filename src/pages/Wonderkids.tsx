import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const Wonderkids: React.FC = () => {
    const { fetchCsvData } = useFetch();
    const [data140, setData140] = useState<any[]>([]);
    const [data150, setData150] = useState<any[]>([]);
    const [data160, setData160] = useState<any[]>([]);
    const [data170, setData170] = useState<any[]>([]);

    useEffect(() => {
        const loadCsvData = (file: string, setData: React.Dispatch<React.SetStateAction<any[]>>) => {
            fetchCsvData(file, (parsedData) => {
                if (Array.isArray(parsedData)) {
                    const cleanedData = parsedData.filter(row => row && Object.keys(row).length > 0);
                    setData(cleanedData);
                } else {
                    console.error(`Parsed data from ${file} is not an array:`, parsedData);
                }
            });
        };

        loadCsvData("./140plus.csv", setData140);
        loadCsvData("./150plus.csv", setData150);
        loadCsvData("./160plus.csv", setData160);
        loadCsvData("./170plus.csv", setData170);
    }, [fetchCsvData]);

    const formatHeader = (header: string) => header.replace(/_/g, " ").toUpperCase();

    const renderTable = (data: any[], title: string) => {
        const headers = data.length > 0 ? Object.keys(data[0]) : [];

        return (
            <div className="wonderkids-table-container">
                <h2>{title}</h2>
                {data.length > 0 ? (
                    <table className="wonderkids-table">
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th key={header}>{formatHeader(header)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((wonderkid, index) => (
                                <tr key={index}>
                                    {headers.map((header) => (
                                        <td key={header}>{wonderkid[header]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
    };

    return (
        <div className="wonderkids">
            <h1>Wonderkids – The Future Stars of Football</h1>
            <p>This section features a list of the most talented young players recognized as wonderkids. The tables include players who are expected to reach at least the specified potential level. These are footballers who could become key figures in top leagues—and some may even rise to legendary status in world football!</p>
            {renderTable(data170, "Potential to be at least World Class Player")}
            {renderTable(data160, "Potential to be at least Top in Top Leagues")}
            {renderTable(data150, "Potential to be at least Solid in Top Leagues")}
            {renderTable(data140, "Potential to be at least Solid in Good Leagues")}
        </div>
    );
};

export default Wonderkids;
