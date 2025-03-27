import { useState, useEffect } from 'react';
import * as cheerio from 'cheerio';

interface PlayerStat {
    name: string;
    age: number;
    position: string;
    average: number;
  }
  

export const useTeamStats = (htmlContent: string) => {
  const [playerStats, setPlayerStats] = useState<PlayerStat[]>([]);
  const [teamAverage, setTeamAverage] = useState(0);
  const [teamAverageAge, setTeamAverageAge] = useState(0);

  useEffect(() => {
    if (htmlContent) {
      const $ = cheerio.load(htmlContent);
      const players: PlayerStat[] = [];

      $('table tr').each((index, element) => {
        if (index === 0) return; // Skip header row
        const columns = $(element).find('td');
        const name = $(columns[1]).text();
        const age = parseInt($(columns[0]).text(), 10);
        const position = $(columns[2]).text(); // Zakładając, że pozycja jest w 3. kolumnie
        const attributes = Array.from(columns.slice(5, 15), el => parseInt($(el).text(), 10));
        const average = attributes.reduce((a: number, b: number) => a + b, 0) / attributes.length;
      
        players.push({ name, age, position, average });
      });
      

      setPlayerStats(players);
      setTeamAverage(players.reduce((sum, player) => sum + player.average, 0) / players.length);
      setTeamAverageAge(players.reduce((sum, player) => sum + player.age, 0) / players.length);
    }
  }, [htmlContent]);

  return { playerStats, teamAverage, teamAverageAge };
};
