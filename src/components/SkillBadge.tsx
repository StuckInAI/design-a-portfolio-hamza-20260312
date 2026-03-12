import type { Skill } from '@/entities/Skill';

interface SkillBadgeProps {
  skill: Skill;
}

const categoryStyles: Record<string, string> = {
  Frontend:
    'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
  Backend:
    'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
  DevOps:
    'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700',
  Tools:
    'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700',
  default:
    'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600',
};

export default function SkillBadge({ skill }: SkillBadgeProps) {
  const style = categoryStyles[skill.category] || categoryStyles.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 hover:shadow-sm ${
        style
      }`}
      title={`${skill.name} — ${skill.proficiency}% proficiency`}
    >
      {skill.name}
      <span className="text-xs opacity-60">{skill.proficiency}%</span>
    </span>
  );
}
