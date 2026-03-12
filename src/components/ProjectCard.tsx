import type { Project } from '@/entities/Project';

interface ProjectCardProps {
  project: Project;
}

const techColors: Record<string, string> = {
  'Next.js': 'bg-black text-white',
  React: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  TypeScript: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Python: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  PostgreSQL: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  MongoDB: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  Docker: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
  'Tailwind CSS': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const techs = project.techStack.split(',').map((t) => t.trim());

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md card-hover overflow-hidden flex flex-col group">
      {/* Card Header with gradient */}
      <div className="h-40 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-2">🚀</div>
            <div className="text-sm font-medium opacity-75">Project</div>
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techs.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                techColors[tech] || techColors.default
              }`}
            >
              {tech}
            </span>
          ))}
          {techs.length > 4 && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
              +{techs.length - 4} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span>🌐</span> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              <span>🐙</span> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
