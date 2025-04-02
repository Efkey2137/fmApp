import React from "react";

interface SearchInputProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, setSearchQuery }) => {
    return (
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
    );
};

export default SearchInput;
