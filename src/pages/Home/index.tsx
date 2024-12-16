import { useEffect, useState } from 'react';
import TopContributors from '../../components/TopContributors';
import ProjectInsights from '../../components/ProjectInsights';
import LanguageBreakdown from '../../components/LanguageBreakdown';
import axios from '../../services/api';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('')
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="h-[100vh] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recruiter's Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TopContributors data={data} />
        <ProjectInsights data={data} />
        <LanguageBreakdown data={data} />
      </div>
    </div>
  );
};

export default Home;
