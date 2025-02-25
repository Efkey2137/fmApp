import { useState, useMemo } from 'react';

type CustomSortConfig = {
    positions: { [key: string]: number };
    levels: { [key: string]: number };
};

const customSortConfig: CustomSortConfig = {
    positions: {
        'GK': 1,
        'DC': 2,
        'DL': 3,
        'DR': 3,
        'DM': 4,
        'CM': 5,
        'AM': 6,
        'AML': 7,
        'AMR': 7,
        'ST': 8
    },
    levels: {
        'World Class': 1,
        'Top in Top Leagues': 2,
        'Good in Top Leagues': 3,
        'Top in Good Leagues': 4
    }
};

const useCustomSort = (data: any[]) => {
    const [sortKey, setSortKey] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const sortData = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortKey === key && sortDirection === 'asc') {
            direction = 'desc';
        }
        setSortKey(key);
        setSortDirection(direction);
    };

    const sortedData = useMemo(() => {
        if (!sortKey) return data;
        return [...data].sort((a, b) => {
            if (sortKey === 'position') {
                // Split positions and take the first one for each player
                const firstPosA = a[sortKey]?.split(',')[0]?.trim() || '';
                const firstPosB = b[sortKey]?.split(',')[0]?.trim() || '';
                
                const posA = customSortConfig.positions[firstPosA] || 999;
                const posB = customSortConfig.positions[firstPosB] || 999;
                return sortDirection === 'asc' 
                    ? posA - posB 
                    : posB - posA;
            }
            
            if (sortKey === 'potential') {
                const levelA = customSortConfig.levels[a[sortKey]] || 999;
                const levelB = customSortConfig.levels[b[sortKey]] || 999;
                return sortDirection === 'asc' 
                    ? levelA - levelB 
                    : levelB - levelA;
            }

            if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortKey, sortDirection]);

    return { sortedData, sortData, sortKey, sortDirection };
};

export default useCustomSort;