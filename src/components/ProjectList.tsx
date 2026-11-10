// src/components/ProjectList.tsx

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div 
          key={project.id}
          className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 flex flex-col justify-between transition-all hover:border-[var(--fg)] shadow-sm"
        >
          <div>
            <h3 className="text-xl font-semibold text-[var(--fg-strong)] tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--fg)] leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mt-6">
            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--panel-alt)] text-[var(--fg)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-[var(--panel-alt)] text-sm">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--accent)] hover:underline flex items-center gap-1.5"
                >
                  GitHub &rarr;
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--accent-alt)] hover:underline flex items-center gap-1.5"
                >
                  Live Demo &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}