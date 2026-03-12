import type { Metadata } from 'next';
import SkillBadge from '@/components/SkillBadge';
import type { Skill } from '@/entities/Skill';

export const metadata: Metadata = {
  title: 'About | My Portfolio',
  description: 'Learn more about me, my experience, and my skills.',
};

async function getSkills(): Promise<Record<string, Skill[]>> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/skills`, { cache: 'no-store' });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

const timeline = [
  {
    year: '2024',
    title: 'Senior Full-Stack Developer',
    company: 'Tech Innovations Inc.',
    description:
      'Leading development of scalable web applications using Next.js, TypeScript, and cloud-native technologies.',
  },
  {
    year: '2022',
    title: 'Full-Stack Developer',
    company: 'Digital Solutions Co.',
    description:
      'Built and maintained multiple client-facing web apps. Improved deployment pipelines and reduced load times by 40%.',
  },
  {
    year: '2020',
    title: 'Frontend Developer',
    company: 'Creative Agency',
    description:
      'Developed responsive UIs and interactive experiences for various clients across industries.',
  },
  {
    year: '2019',
    title: 'Junior Developer',
    company: 'Startup Hub',
    description:
      'Started professional journey building web applications and learning best practices in software development.',
  },
];

const categoryColors: Record<string, string> = {
  Frontend: 'from-blue-500 to-cyan-500',
  Backend: 'from-green-500 to-emerald-500',
  DevOps: 'from-orange-500 to-amber-500',
  Tools: 'from-purple-500 to-violet-500',
};

export default async function AboutPage() {
  const skillsByCategory = await getSkills();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container-max text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Passionate full-stack developer with 5+ years of experience building
            modern web applications. I love solving complex problems with elegant
            solutions.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                My <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  Hi! I&apos;m Alex Johnson, a full-stack developer based in San
                  Francisco. I have a deep passion for building web applications
                  that are not only functional but also beautiful and intuitive.
                </p>
                <p>
                  My journey in web development started over 5 years ago when I
                  built my first website. Since then, I&apos;ve worked with
                  startups and established companies, helping them bring their
                  digital ideas to life.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring hiking
                  trails, reading tech blogs, or contributing to open-source
                  projects. I believe in continuous learning and always staying
                  up-to-date with the latest technologies.
                </p>
                <p>
                  I&apos;m currently available for freelance projects and open to
                  exciting full-time opportunities. Let&apos;s build something
                  amazing together!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Years Experience', value: '5+' },
                { label: 'Projects Completed', value: '50+' },
                { label: 'Happy Clients', value: '30+' },
                { label: 'Technologies', value: '20+' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 text-center card-hover"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Experience <span className="gradient-text">Timeline</span>
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`hidden md:flex ${
                      index % 2 === 0
                        ? 'md:w-1/2 md:justify-end md:pr-8'
                        : 'md:w-1/2 md:pl-8'
                    }`}
                  >
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md card-hover max-w-sm w-full">
                      <span className="text-blue-500 font-bold text-sm">
                        {item.year}
                      </span>
                      <h3 className="font-bold text-lg mt-1">{item.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {item.company}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-slate-900 mt-6" />
                  {/* Mobile view */}
                  <div className="ml-12 md:hidden">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                      <span className="text-blue-500 font-bold text-sm">
                        {item.year}
                      </span>
                      <h3 className="font-bold text-lg mt-1">{item.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {item.company}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`hidden md:block ${
                      index % 2 === 0 ? 'md:w-1/2' : 'md:w-1/2'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          {Object.keys(skillsByCategory).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div
                  key={category}
                  className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6"
                >
                  <h3
                    className={`text-xl font-bold mb-6 bg-gradient-to-r ${
                      categoryColors[category] || 'from-blue-500 to-purple-500'
                    } bg-clip-text text-transparent`}
                  >
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {skill.name}
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${
                              categoryColors[category] ||
                              'from-blue-500 to-purple-500'
                            } progress-bar`}
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">
                No skills data available. Run the seed script.
              </p>
            </div>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {Object.values(skillsByCategory)
              .flat()
              .map((skill) => (
                <SkillBadge key={skill.id} skill={skill} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
