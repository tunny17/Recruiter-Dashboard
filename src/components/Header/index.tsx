import { Link } from 'react-router';
import DarkModeToggle from '../Toggle';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-5 border-b">
      <Link to={`/`}>The Best</Link>

      <nav className="flex items-center gap-10">
        <Link to={`/`}>Home</Link>
        <Link to={`/search`}>Search</Link>
        <Link to={`/blog`}>Blog</Link>
      </nav>

      <DarkModeToggle />
    </header>
  );
};

export default Header;
