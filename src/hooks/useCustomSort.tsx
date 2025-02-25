import { useState } from 'react';

interface Player {
    [key: string]: any; // You can replace 'any' with more specific types based on your data structure
}

const useCustomSort = (data: Player[]) => {
    const [sortedData, setSortedData] = useState<Player[]>(data);

    const positionOrder = ['GK', 'DC', 'DL', 'DR', 'DM', 'CM', 'AMR', 'AML', 'AM', 'ST'];
    const potentialOrder = ['World Class', 'Top in Top Leagues', 'Good in Top Leagues', 'Top in Good Leagues'];

    const sortData = (key: string, direction: 'asc' | 'desc' = 'asc') => {
        const order = key === 'Potential' ? potentialOrder : positionOrder;
        const sorted = [...data].sort((a, b) => {
            let indexA = order.indexOf(a[key].split(', ')[0]); // Split and take the first position if multiple
            let indexB = order.indexOf(b[key].split(', ')[0]);
            indexA = indexA === -1 ? order.length : indexA; // Handle unknown positions or potentials
            indexB = indexB === -1 ? order.length : indexB;

            return direction === 'asc' ? indexA - indexB : indexB - indexA;
        });
        setSortedData(sorted);
    };

    return { sortedData, sortData };
};

export default useCustomSort;
