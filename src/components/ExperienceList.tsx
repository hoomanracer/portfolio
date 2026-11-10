export interface Experience {
  id: string;
  title: string;
  company: string;
  highlights: string[];
  year?: number; //YYYY
  tags: string[];
}

interface ExperienceListProps {
  experiences: Experience[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <div className="space-y-6">
        {experiences.map((experience) => (
            <div
                key={experience.id}
                className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 flex flex-col justify-between transition-all hover:border-[var(--fg)] shadow-sm"
            >
                <div>
                    <h3 className="text-xl font-semibold text-[var(--fg-strong)] tracking-tight">
                        {experience.title}
                    </h3>
                    <h4 className="mt-1 text-sm font-medium text-[var(--fg-muted)] tracking-tight">
                        {experience.company}
                    </h4>
                    <p className="mt-1 text-sm text-[var(--fg-muted)]">
                        {experience.year}
                    </p>
                    {/* Bullet Points */}
                    <ul className="space-y-2 list-disc pl-5 text-sm leading-relaxed text-[var(--fg)]">
                        {experience.highlights.map((highlight, index) => (
                            <li key={index} className="pl-1">
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {experience.tags.map((tag) => (
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