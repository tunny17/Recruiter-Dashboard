/* eslint-disable @typescript-eslint/no-explicit-any */
const BlogSection = ({ title, article, code }: any) => (
  <section className="mt-2">
    <h1 className="text-2xl font-semibold">{title}</h1>
    <p className="leading-7 mt-3">{article}</p>
    {code && (
      <section className="bg-black text-white p-5 text-sm rounded-md leading-7 mt-3">
        <div>{code}</div>
      </section>
    )}
  </section>
);

const Blog = () => {
  const blogData = [
    {
      title: 'Introduction',
      article:
        'Open-source contributions are more than just lines of code—they’re a testament to a developer’s technical expertise, problem-solving skills, and collaborative abilities...'
    },
    {
      title: 'Why a Recruiter’s Dashboard?',
      article:
        'Helping Recruiters Find Talented Developers The recruitment process for developers often involves sifting through hundreds of applications...'
    },
    {
      title: 'Setting Up',
      article:
        'Project Setup To build the Recruiter’s Dashboard, start by setting up your development environment...'
    }
  ];

  const codeBlocks = {
    codeBlock: `
      useEffect(() => {
        async function fetchContributors() {
          const response = await fetch('https://api.naijastars.dev/contributors');
          const contributors = await response.json();
          setContributors(contributors);
        }
        fetchContributors();
      }, [])
    `,
    tableBlock: `
      <table>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Stars</th>
          <th>Forks</th>
          <th>Primary Language</th>
        </tr>
        {contributors.map((contributor, index) => (
          <tr key={contributor.id}>
            <td>{index + 1}</td>
            <td>{contributor.name}</td>
            <td>{contributor.stars}</td>
            <td>{contributor.forks}</td>
            <td>{contributor.language}</td>
          </tr>
        ))}
      </table>
    `,
    chartBlock: `
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
    `
  };

  return (
    <div className="py-5 px-5 md:px-16 w-full border">
      <h1 className="text-2xl md:text-4xl text-center font-semibold">
        Discover Nigeria’s Top Open Source Talent: Build a Recruiter Dashboard Using Naijastars.dev
        API
      </h1>

      <main className="mt-10 flex flex-col gap-4">
        {blogData.map((data, i) => (
          <BlogSection key={i} title={`${i + 1}. ${data.title}`} article={data.article} />
        ))}

        <section className="bg-black text-white p-5 text-sm rounded-md leading-7">
          git clone https://github.com/naijastars/recruiters-dashboard.git <br />
          cd recruiters-dashboard <br />
          npm install <br /> npm start
        </section>

        {/* Render code blocks */}
        <BlogSection
          title="4. Building the Dashboard"
          article="Using the API, fetch data for contributors and their associated projects..."
          code={codeBlocks.codeBlock}
        />

        <BlogSection
          title="Rendering a Leaderboard"
          article="The dashboard’s core feature is a leaderboard that ranks contributors..."
          code={codeBlocks.tableBlock}
        />

        <BlogSection
          title="Adding Visualizations for Language Expertise"
          article="Incorporate charts and graphs to visualize contributors’ expertise..."
          code={codeBlocks.chartBlock}
        />

        {/* Other sections */}
        <section className="mt-5">
          <h1 className="text-2xl font-semibold">5. Deploy and Share</h1>
          <p className="leading-7 mt-3">
            Deploy the dashboard using platforms like Vercel or Netlify for a seamless and free
            deployment experience. Push your project to a GitHub repository and connect it to your
            preferred deployment platform. For example, to deploy with Vercel: <br />
            1. Install the Vercel CLI: npm install -g vercel. <br />
            2. Run vercel in your project directory and follow the prompts. <br />
            3. Share the deployment URL with stakeholders.
          </p>
        </section>

        <section className="mt-5">
          <h1 className="text-2xl font-semibold">Using the Dashboard in Practice</h1>
          <p className="leading-7 mt-3">
            Recruiters can use the dashboard to: <br />
            1. Identify top contributors: Filter by language or metrics to focus on specific skill
            sets. <br />
            2. Assess real-world experience: Evaluate the complexity and impact of contributors’
            projects. <br />
            3. Engage directly with developers: Use contact information or repository links to
            initiate conversations.
          </p>
        </section>

        <section className="mt-5">
          <h1 className="text-2xl font-semibold">6. Conclusion and CTA</h1>
          <p className="leading-7 mt-3">
            The Recruiter’s Dashboard demonstrates how open-source data can revolutionize the hiring
            process. By leveraging the Naijastars.dev API, recruiters and developers alike can
            bridge the gap between talent and opportunity. <br /> We encourage frontend developers
            to explore the API, customize the dashboard, and contribute to its ongoing development.
            Visit{' '}
            <a href="https://Naijastars.dev" target="_blank" className="text-blue-600">
              Naijastars.dev
            </a>{' '}
            to get started and join the movement to highlight the brilliance of Nigeria’s developer
            community!
          </p>
        </section>
      </main>
    </div>
  );
};

export default Blog;
