import { Route, Routes } from 'react-router';
import Home from '../../pages/Home';
import Search from '../../pages/Search';
import Blog from '../../pages/Blog';

const Rout = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
};

export default Rout;
