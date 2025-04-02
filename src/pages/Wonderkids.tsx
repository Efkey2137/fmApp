import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useCustomSort from "../hooks/useCustomSort";
import SearchInput from "./WonderkidsComponents/SearchInput";
import WonderkidsTable from "./WonderkidsComponents/WonderkidsTable";
import PageHeader from "../components/shared/PageHeader";
import { loadMultipleCsvData  } from "../utils/dataUtils";

const Wonderkids: React.FC = () => {
    const { fetchCsvData } = useFetch();
    const [data, setData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { sortedData, sortData, sortKey, sortDirection } = useCustomSort(data);

    useEffect(() => {
        const files = [{ file: "./Wonderkids.csv" }];
        loadMultipleCsvData(files, fetchCsvData, setData);
      }, [fetchCsvData]);

    const filteredData = filterData(sortedData, searchQuery);
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="flex flex-col w-full text-center overflow-x-hidden">
            <PageHeader 
        title="Wonderkids – The Future Stars of Football" 
        description="This section features a list of the most talented young players recognized as wonderkids..." 
      />
            
            <SearchInput 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
            />

            {filteredData.length > 0 ? (
                <WonderkidsTable 
                    data={filteredData}
                    headers={headers}
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    handleSort={sortData}
                />
            ) : (
                <p className="text-left mt-4">No results found...</p>
            )}
        </div>
    );
};

const filterData = (data: any[], searchQuery: string): any[] => {
    // Special cases for potential ratings
    if (searchQuery === "170") {
        return data.filter(row => row.potential === "World Class");
    } if (searchQuery === "160") {
        return data.filter(row => row.potential === "Top in Top Leagues");
    } if (searchQuery === "150") {
        return data.filter(row => row.potential === "Good in Top Leagues");
    } if (searchQuery === "140") {
        return data.filter(row => row.potential === "Top in Good Leagues");
    }

    // Default search behavior
    return data.filter(row => 
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
};

export default Wonderkids;
