import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import SkillBadge from '@/components/SkillBadge';
import Link from 'next/link';
import type { Project } from '@/entities/Project';
import type { Skill } from '@/entities/Skill';

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/projects?featured=true`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

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

export default async function HomePage() {
  const [featuredProjects, skillsByCategory] = await Promise.all([
    getFeaturedProjects(),
    getSkills(),
  ]);

  const allSkills = Object.values(skillsByCategory).flat().slice(0, 12);

  return (
    <div className="animate-fade-in">
      <HeroSection />

      {/* Featured Projects */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured{' '}
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Here are some of my recent projects that I&apos;m proud of.
            </p>
          </div>
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <p>No featured projects yet. Run the seed script to add sample data.</p>
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/projects" className="btn-primary inline-block">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Technologies and tools I work with.
            </p>
          </div>
          {allSkills.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-3">
              {allSkills.map((skill) => (
                <SkillBadge key={skill.id} skill={skill} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <p>No skills yet. Run the seed script to add sample data.</p>
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/about" className="btn-secondary inline-block">
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
            Have a project in mind? I&apos;d love to hear about it and see how
            we can collaborate.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-lg inline-block"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
