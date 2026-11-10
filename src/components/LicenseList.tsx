export interface License {
    id: string;
    name: string;
    institution?: string;
    description: string;
    year: number;
    url?: string;
}

interface LicenseListProps {
    licenses: License[];
}

export function LicenseList({ licenses }: LicenseListProps) {
    return (
        <div className="space-y-6">
            {licenses.map((license) => (
                <div
                    key={license.id}
                    className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-6 flex flex-col justify-between transition-all hover:border-[var(--fg)] shadow-sm"
                >
                    <div>
                        <h3 className="text-xl font-semibold text-[var(--fg-strong)] tracking-tight">
                            {license.name}
                        </h3>
                        {license.institution && (
                            <h4 className="mt-1 text-sm font-medium text-[var(--fg-muted)] tracking-tight">
                                {license.institution}
                            </h4>
                        )}
                        <p className="mt-1 text-sm text-[var(--fg-muted)]">
                            {license.year}
                        </p>
                        <p className="mt-2 text-sm text-[var(--fg)] leading-relaxed">
                            {license.description}
                        </p>
                        {license.url && (
                            <a
                                href={license.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
                            >
                                View License
                                <span aria-hidden="true">→</span>
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}