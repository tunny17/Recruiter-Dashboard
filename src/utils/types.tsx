interface License {
  key: string;
  url: string;
  name: string;
}

export interface Repository {
  full_name: string;
  id: number;
  name: string;
  link: string;
  description: string;
  author: string;
  author_link: string;
  author_avatar: string;
  stars: number;
  topics: string[];
  license: License;
  forks: number;
  open_issues_count: number;
  archived: boolean;
  disabled: boolean;
  original_created_at: string; // ISO date string
  original_updated_at: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  author_link_madeinnigeria: string;
  author_madeinnigeria: string;
  language: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
  };
}
