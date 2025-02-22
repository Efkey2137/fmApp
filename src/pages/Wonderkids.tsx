import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const Wonderkids: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const { fetchCsvData } = useFetch();

    useEffect(() => {
        fetchCsvData("./exampleData.csv", (parsedData) => {
            if (Array.isArray(parsedData)) {
                const cleanedData = parsedData.filter(row => row && Object.keys(row).length > 0);
                setData(cleanedData);
            } else {
                console.error("Parsed data is not an array:", parsedData);
            }
        });
    }, []);

    useEffect(() => {
        console.log("Updated data:", data);
    }, [data]);

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    const formatHeader = (header: string) => 
        header.replace(/_/g, " ").toUpperCase();

    return (
        <div>
            <h1>Wonderkids</h1>
            <p>Full list of FM wonderkids</p>

            {data.length > 0 ? (
                <table className="wonderkids-table">
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th key={header}>
                                    {formatHeader(header)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((wonderkid, index) => (
                            <tr key={index}>
                                {headers.map((header) => (
                                    <td key={header}>
                                        {wonderkid[header]}
                                    </td>
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

export default Wonderkids;
