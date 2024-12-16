/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

import axios from '../../services/api';
import { Repository } from '../../utils/types';

const LanguageBreakdown = ({ data }: any) => {
  const [languageData, setLanguageData] = useState([]);
  const [authorsDetails, setAuthorsDetails] = useState<any>([]);
  const [selectedContributor, setSelectedContributor] = useState('');

  function calculateLanguageBreakdown(data: any) {
    return data.map((repoArray: Repository[]) => {
      const languageCount = {};
      let totalRepos = 0;

      repoArray.forEach((repo: Repository) => {
        const language = repo.language;
        if (language) {
          languageCount[language] = (languageCount[language] || 0) + 1;
          totalRepos++;
        }
      });

      const languageBreakdown = Object.entries(languageCount).map(([lang, count]) => ({
        [lang]: ((count / totalRepos) * 100).toFixed(2) + '%'
      }));

      return {
        name: repoArray[0]?.name || 'Unknown',
        full_name: repoArray[0]?.full_name || 'Unknown',
        language: languageBreakdown
      };
    });
  }

  useEffect(() => {
    const fetchAuthorsDetails = async () => {
      const authorRequests = data.map((contributor) =>
        axios
          .get(`https://api.github.com/users/${contributor.author}/repos`, {
            headers: { Accept: 'application/vnd.github.v3+json' }
          })
          .then((response) => response.data)
          .catch((error) => {
            console.error(`Failed to fetch details for ${contributor.author}:`, error);
            return null;
          })
      );

      const results = await Promise.all(authorRequests);
      const filteredData = results.filter((author) => author !== null);
      const breakdown = calculateLanguageBreakdown(filteredData);
      setAuthorsDetails(breakdown);
      if (breakdown.length > 0) {
        setSelectedContributor(breakdown[0].name); // Default to the first contributor
      }
    };

    fetchAuthorsDetails();
  }, [data]);

  useEffect(() => {
    if (selectedContributor) {
      const contributorData = authorsDetails.find((author) => author.name === selectedContributor);
      if (contributorData) {
        const flattenedLanguageData = contributorData.language.map((langObj) => {
          const [lang, percentage] = Object.entries(langObj)[0];
          return { language: lang, percentage: parseFloat(percentage) };
        });
        setLanguageData(flattenedLanguageData);
      }
    }
  }, [selectedContributor, authorsDetails]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-4 bg-white dark:bg-black border dark:text-white shadow rounded flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">Language Proficiency Breakdown</h2>
      <select
        className="mb-4 p-2 border rounded"
        value={selectedContributor}
        onChange={(e) => setSelectedContributor(e.target.value)}
      >
        {authorsDetails.map((author, i) => (
          <option key={i} value={author.name}>
            {author.name}
          </option>
        ))}
      </select>
      {languageData.length > 0 ? (
        <PieChart width={400} height={300}>
          <Pie
            data={languageData}
            dataKey="percentage"
            nameKey="language"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
          >
            {languageData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <p>No data available for the selected contributor.</p>
      )}
    </div>
  );
};

export default LanguageBreakdown;
