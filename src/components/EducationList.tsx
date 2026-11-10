export interface Education {
  id: string;
  degree: string;
  institution: string;
  startYear: number; // YYYY
  endYear?: number | 'Present'; // YYYY or omit for Present
  highlights: string[];
  tags: string[];
}

interface EducationListProps {
  education: Education[];
}

export function EducationList({ education }: EducationListProps) {
  return (
    <div className="space-y-6">
        {education.map((edu) => (
            <div
                key={edu.id}
                className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 flex flex-col justify-between transition-all hover:border-[var(--fg)] shadow-sm"
            >
                <div>
                    <h3 className="text-xl font-semibold text-[var(--fg-strong)] tracking-tight">
                        {edu.degree}
                    </h3>
                    <h4 className="mt-1 text-sm font-medium text-[var(--fg-muted)] tracking-tight">
                        {edu.institution}
                    </h4>
                    <p className="mt-1 text-sm text-[var(--fg-muted)]">
                        {edu.startYear} - {edu.endYear || 'Present'}
                    </p>
                    {/* Bullet Points */}
                    <ul className="space-y-2 list-disc pl-5 text-sm leading-relaxed text-[var(--fg)]">
                        {edu.highlights.map((highlight, index) => (
                            <li key={index} className="pl-1">
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {edu.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--panel-alt)] text-[var(--fg)]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
}