import axios from 'axios';
import { useEffect, useState } from 'react';
import { Repository } from '../../utils/types';

export interface AuthorDetails {
  login: string;
  avatar_url: string;
  author_avatar: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

const TopContributors = ({ data }: { data: Repository[] }) => {
  const [authorsDetails, setAuthorsDetails] = useState<AuthorDetails[]>([]);

  useEffect(() => {
    const fetchAuthorsDetails = async () => {
      const authorRequests = data.map((contributor) =>
        axios
          .get(`https://api.github.com/users/${contributor.author}`, {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`
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
      setAuthorsDetails(results.filter((author) => author !== null));
    };

    fetchAuthorsDetails();
  }, [data]);

  useEffect(() => {
    console.log('authorsDetails', authorsDetails);
  }, [authorsDetails]);

  return (
    <div className="p-4 bg-white dark:bg-black dark:border dark:text-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Top Contributors</h2>
      <ul className="h-[50vh] overflow-y-scroll overflow-hidden">
        {authorsDetails.map((author, index) => (
          <li key={index} className="flex items-center space-x-4 border-b py-2">
            <img
              src={author.avatar_url}
              alt={`${author.login}'s avatar`}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <a
                href={author.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium"
              >
                {author.login}
              </a>
              <p>Name: {author.name || 'N/A'}</p>
              <p>Bio: {author.bio || 'N/A'}</p>
              <p>Public Repos: {author.public_repos}</p>
              <p>Followers: {author.followers}</p>
              <p>Following: {author.following}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopContributors;
