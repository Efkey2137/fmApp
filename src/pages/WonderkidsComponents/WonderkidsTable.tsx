import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

interface WonderkidsTableProps {
    data: any[];
    headers: string[];
    sortKey: string;
    sortDirection: "asc" | "desc";
    handleSort: (key: string) => void;
}

const WonderkidsTable: React.FC<WonderkidsTableProps> = ({ 
    data, 
    headers, 
    sortKey, 
    sortDirection, 
    handleSort 
}) => {
    return (
        <div className="overflow-x-auto mt-20 w-full scrollbar">
            <table className="w-full border-collapse text-left select-text">
                <TableHeader 
                    headers={headers}
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                />
                <tbody>
                    {data.map((wonderkid, index) => (
                        <TableRow 
                            key={index}
                            rowData={wonderkid}
                            headers={headers}
                            isEven={index % 2 === 0}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WonderkidsTable;
