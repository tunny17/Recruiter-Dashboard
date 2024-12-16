import { useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { Repository } from '../../utils/types';

const Search = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [language, setLanguage] = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [order, setOrder] = useState('desc');
  const [loading, setLoading] = useState(false);

  // Handle search and filters
  const handleSearch = () => {
    if (!searchText.trim() && !language && !licenseType) {
      alert('Please enter a search term or select filters.');
      return;
    }

    // Construct the query string
    const query = [
      searchText.trim(),
      language ? `language:${language}` : '',
      licenseType ? `license:${licenseType}` : ''
    ]
      .filter(Boolean)
      .join(' ');

    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query
    )}&sort=${sortBy}&order=${order}`;

    setLoading(true); // Start loading
    setData([]); // Clear previous data

    // Fetch data from GitHub Search API
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        if (res.items) {
          setData(res.items);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching GitHub repositories:', err);
        alert('An error occurred. Please try again.');
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <section className="px-5 overflow-hidden h-[100vh] overflow-y-auto dark:bg-black dark:text-white">
      <section className="flex flex-col md:flex-row py-5 justify-between items-center w-full">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            className="border px-2 py-1 rounded-md dark:text-black dark:placeholder:text-black"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Programming Language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <select
            className="border px-2 py-1 rounded-md dark:text-black dark:placeholder:text-black"
            value={licenseType}
            onChange={(e) => setLicenseType(e.target.value)}
          >
            <option value="">License Type</option>
            <option value="mit">MIT</option>
            <option value="apache-2.0">Apache 2.0</option>
          </select>

          <select
            className="border px-2 py-1 rounded-md dark:text-black dark:placeholder:text-black"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="updated">Recently Updated</option>
          </select>

          <select
            className="border px-2 py-1 rounded-md dark:text-black dark:placeholder:text-black"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </div>

        <div className="w-full md:w-[50%] my-5 flex gap-5 items-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for repository"
            className="w-full py-2 px-3 border rounded-md dark:text-black dark:placeholder:text-black"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 border rounded-md outline-blue-500  bg-blue-500 text-white hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <BounceLoader />
        </div>
      ) : (
        <section className="flex flex-wrap justify-between gap-y-5">
          {data.length > 0 ? (
            data.map((repo: Repository) => (
              <li
                key={repo.id}
                className="w-full md:w-[30%] border rounded-md flex items-center gap-10 p-4 hover:scale-95 duration-500 transition-all"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl uppercase font-medium rounded-full h-10 w-10 flex items-center justify-center text-white bg-blue-500 hover:underline "
                >
                  {repo.name[0]}
                </a>

                <div className="text-base">
                  <p>
                    <strong> Name: </strong> {repo.owner.login}
                  </p>
                  <p>
                    <strong> Owner: </strong> {repo.owner.login}
                  </p>
                  <p>
                    <strong> Stars: </strong> {repo.stargazers_count}
                  </p>
                  <p>
                    <strong> Forks: </strong> {repo.forks_count}
                  </p>
                  <p>
                    <strong> Language: </strong> {repo.language || 'N/A'}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p className="mt-10 text-center">
              No results found. Try searching for something else or modifying filters.
            </p>
          )}
        </section>
      )}
    </section>
  );
};

export default Search;
