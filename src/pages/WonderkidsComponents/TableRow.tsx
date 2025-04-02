import React from "react";

interface TableRowProps {
    rowData: any;
    headers: string[];
    isEven: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ rowData, headers, isEven }) => {
    return (
        <tr 
            className={`
                transition-colors duration-200
                hover:bg-[#393046] cursor-pointer
                ${isEven ? 'bg-[#1b1b1b]' : 'bg-[#222031]'}
            `}
        >
            {headers.map((header) => (
                <td key={header} className="p-4 border-b border-[#393046]">
                    {rowData[header]}
                </td>
            ))}
        </tr>
    );
};

export default TableRow;
