import React, { useState } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';
import { useTeamStats } from '../hooks/useTeamStats';
import '../css/RateTeam.css';

type SortField = 'name' | 'age' | 'position' | 'average';
type SortDirection = 'asc' | 'desc';

const RateTeam: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const { uploadFile } = useFileUpload(setHtmlContent);
  const { playerStats, teamAverage, teamAverageAge } = useTeamStats(htmlContent);
  
  // Dodane stany do sortowania
  const [sortField, setSortField] = useState<SortField>('average');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleDownloadView = () => {
    const viewFileUrl = `${process.env.PUBLIC_URL}/RateTeamView.fmf`;
    
    // Tworzenie elementu a do pobrania pliku
    const link = document.createElement('a');
    link.href = viewFileUrl;
    link.download = 'RateTeamView.fmf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Funkcja do sortowania
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Jeśli kliknięto tę samą kolumnę, zmień kierunek sortowania
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Jeśli kliknięto inną kolumnę, ustaw ją jako aktualną i sortuj malejąco
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Sortowanie danych
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
    } else { // average
      return sortDirection === 'asc' 
        ? a.average - b.average 
        : b.average - a.average;
    }
  });

  // Funkcja zwracająca klasę dla nagłówka kolumny
  const getSortClass = (field: SortField) => {
    if (field === sortField) {
      return sortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
    }
    return '';
  };

  return (
    <div className="rate-team-container">
      
      
      
      {/* <hr className="section-divider" /> */}
      
      {/* Sekcja wgrywania pliku HTML */}
      <div className="upload-section">
        <h2>Import html file with squad data</h2>
        <input type="file" onChange={uploadFile} accept=".html" />
      </div>

      {/* Wyświetlanie statystyk */}
      {playerStats.length > 0 && (
        <div className="stats-section">
          <h2>Team Statistic</h2>
          <div className="team-summary">
            <p><strong>Team Average:</strong> {teamAverage.toFixed(1)}</p>
            <p><strong>Team Average Age:</strong> {teamAverageAge.toFixed(1)}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th 
                  className={getSortClass('name')} 
                  onClick={() => handleSort('name')}
                >
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className={getSortClass('age')} 
                  onClick={() => handleSort('age')}
                >
                  Age {sortField === 'age' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className={getSortClass('position')} 
                  onClick={() => handleSort('position')}
                >
                  Position {sortField === 'position' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className={getSortClass('average')} 
                  onClick={() => handleSort('average')}
                >
                  Average {sortField === 'average' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.age}</td>
                  <td>{player.position}</td>
                  <td>{player.average.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {/* Sekcja pobierania widoku FM */}
      <div className="download-view-section">
        <h2>Download view for Football Manager</h2>
        <p>Click the button below to download a view that can be imported into Football Manager.</p>
        <button 
          className="download-button" 
          onClick={handleDownloadView}
        >
          Download view
        </button>
      </div>
      
    </div>
  );
};

export default RateTeam;
