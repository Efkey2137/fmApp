import React, { useState } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';
import { useTeamStats } from '../hooks/useTeamStats';
import "../index.css"; // Import your CSS styles here
// import '../css/RateTeam.css';

type SortField = 'name' | 'age' | 'position' | 'average';
type SortDirection = 'asc' | 'desc';

const RateTeam: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const { uploadFile } = useFileUpload(setHtmlContent);
  const { playerStats, teamAverage, teamAverageAge } = useTeamStats(htmlContent);
  
  const [sortField, setSortField] = useState<SortField>('average');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleDownloadView = () => {
    const viewFileUrl = `${process.env.PUBLIC_URL}/RateTeamView.fmf`;
    
    const link = document.createElement('a');
    link.href = viewFileUrl;
    link.download = 'RateTeamView.fmf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPlayers = [...playerStats].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortField === 'age') {
      return sortDirection === 'asc' 
        ? a.age - b.age 
        : b.age - a.age;
    } else if (sortField === 'position') {
      return sortDirection === 'asc' 
        ? a.position.localeCompare(b.position) 
        : b.position.localeCompare(a.position);
    } else {
      return sortDirection === 'asc' 
        ? a.average - b.average 
        : b.average - a.average;
    }
  });

  const getSortIndicator = (field: SortField) => {
    if (field === sortField) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="max-w-[1400px] mx-auto p-8 flex flex-col gap-6">
      {/* Upload Section */}
      <div className="bg-[#151515] p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Import html file with squad data</h2>
        <label className="relative block">
          <input 
            type="file" 
            onChange={uploadFile} 
            accept=".html"
            className="w-full p-5 border-2 border-dashed border-primary rounded-xl 
                     bg-[#252525] text-white cursor-pointer
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-primary file:text-white
                     hover:file:bg-primary-hover
                     hover:border-primary-hover
                     transition-all duration-300 hover:shadow-lg
                     focus:outline-none focus:border-primary-hover
                     md:p-6"
          />
        </label>
      </div>

      {/* Stats Section */}
      {playerStats.length > 0 && (
        <div className="bg-[#151515] p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Team Statistics</h2>
          <div className="bg-[#1b1b1b] p-6 rounded-lg mb-6 flex flex-wrap gap-8">
            <p className="text-lg">
              <span className="text-primary font-semibold mr-2">Team Average:</span>
              {teamAverage.toFixed(1)}
            </p>
            <p className="text-lg">
              <span className="text-primary font-semibold mr-2">Team Average Age:</span>
              {teamAverageAge.toFixed(1)}
            </p>
          </div>
          
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['name', 'age', 'position', 'average'].map((field) => (
                    <th 
                      key={field}
                      onClick={() => handleSort(field as SortField)}
                      className="bg-primary text-left p-4 cursor-pointer hover:bg-primary-hover 
                               transition-colors duration-200 first:rounded-tl-lg last:rounded-tr-lg"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                      {getSortIndicator(field as SortField)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.map((player, index) => (
                  <tr 
                    key={index}
                    className={`hover:bg-[#393046] cursor-pointer transition-colors duration-200 
                              ${index % 2 === 0 ? 'bg-[#1b1b1b]' : 'bg-[#222031]'}
                              ${index === sortedPlayers.length - 1 ? 'last:rounded-b-lg' : ''}`}
                  >
                    <td className="p-4">{player.name}</td>
                    <td className="p-4">{player.age}</td>
                    <td className="p-4">{player.position}</td>
                    <td className="p-4">{player.average.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Download Section */}
      <div className="bg-[#151515] p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Download view for Football Manager</h2>
        <p className="text-lg mb-4 text-gray-300">
          Click the button below to download a view that can be imported into Football Manager.
        </p>
        <button 
          onClick={handleDownloadView}
          className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-medium 
                   tracking-wide transition-all duration-300 
                   hover:bg-primary-hover hover:shadow-xl 
                   active:translate-y-0 active:shadow-md"
        >
          Download view
        </button>
      </div>
    </div>
  );
};

export default RateTeam;
