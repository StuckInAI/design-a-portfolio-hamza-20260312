'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import type { Project } from '@/entities/Project';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [allTechs, setAllTechs] = useState<string[]>(['All']);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data);
        const techs = new Set<string>();
        data.forEach((p) =>
          p.techStack.split(',').forEach((t) => techs.add(t.trim()))
        );
        setAllTechs(['All', ...Array.from(techs).sort()]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    selectedTech === 'All'
      ? projects
      : projects.filter((p) =>
          p.techStack.split(',').map((t) => t.trim()).includes(selectedTech)
        );

  return (
    <div className="animate-fade-in">
      <section className="section-padding bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container-max text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            A collection of projects I&apos;ve built, ranging from web apps to
            developer tools.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-max">
          {/* Filter */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTech === tech
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 animate-pulse h-64"
                >
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4 w-3/4" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-5/6" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/6" />
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
                Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                {selectedTech !== 'All' && ` using ${selectedTech}`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-slate-500 dark:text-slate-400">
                {projects.length === 0
                  ? 'Run the seed script to populate projects.'
                  : `No projects use ${selectedTech}. Try a different filter.`}
              </p>
              {selectedTech !== 'All' && (
                <button
                  onClick={() => setSelectedTech('All')}
                  className="mt-4 btn-primary"
                >
                  Clear Filter
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
