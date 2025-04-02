import React from "react";

interface TableHeaderProps {
    headers: string[];
    sortKey: string;
    sortDirection: "asc" | "desc";
    handleSort: (key: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ 
    headers, 
    sortKey, 
    sortDirection, 
    handleSort 
}) => {
    const formatHeader = (header: string): string => header.replace(/_/g, " ").toUpperCase();
    
    const getSortIcon = (direction: "asc" | "desc") => {
        return direction === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <thead>
            <tr>
                {headers.map((header) => (
                    <th 
                        key={header} 
                        onClick={() => handleSort(header)}
                        className="bg-primary px-4 py-4 text-left
                                 cursor-pointer hover:bg-primary-hover
                                 text-gray-100 transition-colors duration-300"
                        style={{ minWidth: '150px' }}
                    >
                        <span>{formatHeader(header)}</span>
                        {sortKey === header && (
                            <span className="ml-1">
                                {getSortIcon(sortDirection)}
                            </span>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
