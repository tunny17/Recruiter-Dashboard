import axios from 'axios';
import { useEffect, useState } from 'react';
import { Repository } from '../../utils/types';

const ProjectInsights = ({ data }: { data: Repository[] }) => {
  const [repositoryDetails, setRepositoryDetails] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      const authorRequests = data.map((contributor) =>
        axios
          .get(`https://api.github.com/repos/${contributor.author}/${contributor.name}`, {
            headers: {
              Accept: 'application/vnd.github.v3+json'
            }
          })
          .then((response) => response.data)
          .catch((error) => {
            console.error(
              `Failed to fetch details for ${contributor.author_madeinnigeria}:`,
              error
            );
            return null;
          })
      );

      const results = await Promise.all(authorRequests);
      setRepositoryDetails(results.filter((author) => author !== null));
    };

    fetchRepositoryDetails();
  }, [data]);

  return (
    <div className="p-4 bg-white dark:bg-black dark:border dark:text-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Top 10 Projects</h2>
      <ul className="h-[50vh] overflow-y-scroll overflow-hidden">
        {data.map((project, index) => (
          <li key={index} className="mb-4">
            <h3 className="text-lg font-medium">{project.name}</h3>
            <p>{project.author}</p>
            <p>{project.description}</p>
            <p>
              Stars: {project.stars} | Forks: {project.forks}
            </p>
            <p>Primary Language: {repositoryDetails.language}</p>
            <a
              href={project.author_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              View Repository
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectInsights;
