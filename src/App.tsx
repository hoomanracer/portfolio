// src/App.tsx
import { useEffect, useRef, useState } from 'react';
import { ExperienceList, type Experience } from './components/ExperienceList';
import { ProjectList, type Project } from './components/ProjectList';
import { EducationList, type Education } from './components/EducationList';
import { LicenseList, type License } from './components/LicenseList';
import profileImage from './assets/grad_perfil.jpg'; // Import your profile image

const CURRENT_YEAR = new Date().getFullYear();

const SECTION_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'licenses', label: 'Licenses' },
];

const MY_EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: 'Agentic AI Engineer Intern',
    company: 'Accenture - Madrid',
    highlights: [
      'Built and deployed agentic AI engine to create knowledge graphs in our Neo4j database, using Python, LangChain, Pandas, with an OpenAI API for structured and non-structured data intake, added embeddings and optimized processing.',
      'Refactored old LLM integration code bases and implemented new features improving performance and maintainability, documenting the codebase for future developers.',
    ],
    year: 2026,
    tags: ['Python', 'ETL', 'LangChain', 'CI/CD', 'Neo4j', 'RAG', 'LLM'],
  },
  {
    id: '2',
    title: 'Generative AI Engineer Intern',
    company: 'Accenture - Madrid',
    highlights: [
      'Designed and tested a generative AI and image recognition engine using Python and Hugging Face soruced AI models running on CPU power for real-time image detection, description and creation,optimzed for low-resource computers.',
      'Completed weekly track of training challenges, creating various prototypes and testing different approaches, leading to a final project that was presented near the end of my first internship at Accenture.',
    ],
    year: 2025,
    tags: ['Python', 'ML', 'OpenCV', 'SQL', 'Fine-Tuning'],
  },
  {
    id: '2',
    title: 'Developer & IT Helpdesk Intern',
    company: 'GrandVoyage - Barcelona',
    highlights: [
      'Designed and implemented a web scraping engine using Python and Playwright for error and corrupt data tracking, optimzing fixes for production.',
      'Provided on-side IT support, troubleshooting and resolving technical issues for all departments, ensuring smooth operations and minimal downtime.',
    ],
    year: 2024,
    tags: ['Python', 'Playwright', 'SQL', 'Frontend', 'Helpdesk', 'IT Support'],
  },
];

// Sample projects data (you can replace these with your actual builds)
const MY_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'El Periódico de la Ingeniería App',
    description: 'Final project for my Multiplatform Application Development degree, a full-stack application with Java Spring Boot backend and React Native frontend, implementing JWT authentication, cryptography for user data and REST API endpoints.',
    tags: ['Java', 'Spring Boot', 'React Native', 'Docker'],
    githubUrl: 'https://github.com/hoomanracer/app_ingenieria_final',
  },
  {
    id: '2',
    title: 'Personal Website',
    description: 'Personal website built with React and TypeScript as a side project, showcasing my portfolio, projects, and experience.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hoomanracer/portfolio',
  },
];

const MY_EDUCATION: Education[] = [
  {
    id: '1',
    degree: 'Multiplatform Application Development Associate Degree (DAM)',
    institution: 'ESIC Business & Marketing School - Madrid',
    startYear: 2024,
    endYear: 2026,
    highlights: [
      'Final project involved building a full-stack application with Java Spring Boot backend and React Native frontend, implementing JWT authentication and caching layers, shown the app and all functionalities in a live demonstration with great success.',

      'Gained hands-on experience in mobile and web application development, cryptography, DBA, API Development, leading tech industry practices and focused on both front-end and back-end technologies.',
    ],
    tags: ['Java', 'SQL','Spring Boot', 'React Native', 'Mobile Development', 'Full-Stack Development', 'DBA','Docker'],
  },
  {
    id: '2',
    degree: 'Systems and Networking Associate Degree (SMR)',
    institution: 'Stucom Còrsega - Barcelona',
    startYear: 2022,
    endYear: 2024,
    highlights: [
      'Completed our team project by building our server starting from hardware, later installing Linux Server. Created a complete website with Apache, MySQL, letting users send contact forms backed by PHP, with local mail, ticket system, FTP server and DNS configuration, demonstrating all functionalities live.',

      'Gained foundational knowledge in computer systems, networking protocols, and IT infrastructure management.',

      'Simulated real-world networking scenarios, improving problem-solving and troubleshooting skills.',
    ],
    tags: ['Networking', 'Linux Server', 'Windows Server', 'Apache ', 'Bash', 'HTML/CSS','JavaScript', 'PHP'],
  },
];

const MY_LICENSES: License[] = [
  {
    id: '1',
    name: 'IT Specialist - Python',
    institution: 'Pearson VUE / Certiport',
    description: 'Proves structural proficiency in Python programming. Demonstrated a solid understanding of writing, reading, and debugging clean code.',
    year: 2026,
    url: 'https://www.credly.com/badges/4bd9da7a-056d-4e91-a2ad-2d334bf0137d/public_url',
  },
  {
    id: '2',
    name: 'Microsoft Certified: Azure Fundamentals AZ-900',
    institution: 'Microsoft / Pearson VUE',
    description: 'Proves knowledge of cloud concepts, core Azure architecture, and cloud management tools. The exam covers various cloud computing models (IaaS, PaaS, SaaS), Azure infrastructure services, security measures, and cost management strategies.',
    year: 2025,
    url: 'https://www.credly.com/badges/3f225dcb-7124-4b47-a68f-e6f767870bac/public_url',
  },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const activeSectionIndex = SECTION_LINKS.findIndex(({ id }) => id === activeSection);
  const mobileNavButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobileNavListRef = useRef<HTMLUListElement | null>(null);

  const navTouchingRef = useRef(false);   // finger is on the nav
  const navSwipingRef = useRef(false);    // swipe in progress (finger down or still gliding)
  const navStartLeftRef = useRef(0);
  const navSettleTimerRef = useRef<number | null>(null);
  const selectionLockUntilRef = useRef(0); // briefly ignore scroll-driven highlight changes after a swipe jump

  const centerMobileNavItem = (sectionId: string) => {
    if (navSwipingRef.current) return; // never move the nav under the user's finger
    const index = SECTION_LINKS.findIndex(({ id }) => id === sectionId);
    const activeButton = mobileNavButtonRefs.current[index];
    const navList = mobileNavListRef.current;
    if (!activeButton || !navList) return;

    const targetLeft =
      activeButton.offsetLeft + activeButton.offsetWidth / 2 - navList.clientWidth / 2;
    navList.scrollTo({ left: targetLeft, behavior: 'smooth' });
  };

  const settleNavSwipe = () => {
    const navList = mobileNavListRef.current;
    navSwipingRef.current = false;
    if (!navList) return;
    if (Math.abs(navList.scrollLeft - navStartLeftRef.current) < 3) return; // a tap, not a swipe

    const center = navList.scrollLeft + navList.clientWidth / 2;
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    mobileNavButtonRefs.current.forEach((button, index) => {
      if (!button) return;
      const d = Math.abs(button.offsetLeft + button.offsetWidth / 2 - center);
      if (d < best) {
        best = d;
        nearest = index;
      }
    });

    selectionLockUntilRef.current = Date.now() + 400;
    scrollToSection(SECTION_LINKS[nearest].id, 'auto');
  };

  const armNavSettle = () => {
    if (navSettleTimerRef.current) window.clearTimeout(navSettleTimerRef.current);
    navSettleTimerRef.current = window.setTimeout(settleNavSwipe, 120);
  };

  useEffect(() => {
    if (activeSectionIndex >= 0) {
      centerMobileNavItem(SECTION_LINKS[activeSectionIndex].id);
    }
  }, [activeSectionIndex]);

  useEffect(() => {
    const sections = SECTION_LINKS
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      if (Date.now() < selectionLockUntilRef.current) return;
      const viewportAnchor = window.innerHeight * 0.35;
      let closestId = SECTION_LINKS[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      SECTION_LINKS.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return;

        const distance = Math.abs(section.getBoundingClientRect().top - viewportAnchor);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      });

      setActiveSection(closestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < selectionLockUntilRef.current) return;
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
          return;
        }

        updateActiveSection();
      },
      {
        root: null,
        threshold: [0.15, 0.3, 0.6],
        rootMargin: '-15% 0px -45% 0px',
      },
    );

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const scrollToSection = (id: string, behavior: ScrollBehavior = 'smooth') => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({ behavior, block: 'start' });
    setActiveSection(id);
    centerMobileNavItem(id);
  };

  return (
    <div className={darkMode ? 'theme-dark' : 'theme-light'}>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg-strong)] transition-colors duration-200">
        <nav className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 min-[1280px]:flex">
          <ul className="flex w-44 flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--panel)]/85 p-2 shadow-md backdrop-blur-sm">
            {SECTION_LINKS.map(({ id, label }) => {
              const isActive = activeSection === id;

              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className={`flex w-full items-center justify-start rounded-sm px-2.5 py-2 text-left text-[11px] font-medium tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'bg-[var(--panel-alt)] text-[var(--fg-strong)] shadow-sm'
                        : 'text-[var(--fg-muted)] hover:bg-[var(--panel-alt)] hover:text-[var(--fg-strong)]'
                    }`}
                    aria-label={`Go to ${label}`}
                  >
                    <span>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setDarkMode((value) => !value)}
          className="fixed right-5 top-5 z-50 hidden h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)]/85 px-3 text-sm font-medium text-[var(--fg-strong)] shadow-md backdrop-blur-sm transition hover:border-[var(--fg-muted)] min-[1280px]:inline-flex"
          aria-label="Toggle light and dark mode"
        >
          <span aria-hidden="true">{darkMode ? '☀︎︎' : '❍'}</span>
          {darkMode ? 'Light' : 'Dark'}
        </button>

        <div className="fixed inset-x-0 top-0 z-40 flex justify-center pt-3 min-[1280px]:hidden">
          <div className="flex items-center gap-2">
            <div
              className="h-11 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--panel)]/95 shadow-md"
              style={{ width: 'clamp(170px, 38vw, 260px)' }}
            >
              <div
                className="h-full"
                style={{
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
                  maskImage:
                    'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
                }}
              >
                <ul
                  ref={mobileNavListRef}
                  onTouchStart={() => {
                    navTouchingRef.current = true;
                    navStartLeftRef.current = mobileNavListRef.current?.scrollLeft ?? 0;
                  }}
                  onTouchEnd={() => {
                    navTouchingRef.current = false;
                    if (navSwipingRef.current) armNavSettle();
                  }}
                  onTouchCancel={() => {
                    navTouchingRef.current = false;
                    if (navSwipingRef.current) armNavSettle();
                  }}
                  onScroll={() => {
                    if (navTouchingRef.current) navSwipingRef.current = true;
                    if (navSwipingRef.current) armNavSettle();
                  }}
                  className="relative flex h-full snap-x snap-mandatory items-center gap-1 overflow-x-auto overflow-y-hidden whitespace-nowrap px-[50%] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  style={{ touchAction: 'pan-x', overscrollBehaviorX: 'contain' }}
                >
                  {SECTION_LINKS.map(({ id, label }, index) => {
                    const isActive = activeSection === id;
                    const distance = Math.abs(index - activeSectionIndex);
                    const opacity = isActive ? 1 : distance === 1 ? 0.72 : distance === 2 ? 0.38 : 0.18;

                    return (
                      <li key={id} className="shrink-0 snap-center">
                        <button
                          ref={(element) => {
                            mobileNavButtonRefs.current[index] = element;
                          }}
                          type="button"
                          onClick={() => scrollToSection(id)}
                          className={`flex h-8 items-center rounded-full px-2 text-[10px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                            isActive
                              ? 'bg-[var(--panel-alt)] text-[var(--fg-strong)] shadow-sm'
                              : 'text-[var(--fg-muted)] hover:text-[var(--fg-strong)]'
                          }`}
                          style={{ opacity, whiteSpace: 'nowrap' }}
                          aria-label={`Go to ${label}`}
                        >
                          {label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDarkMode((value) => !value)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)]/85 px-3 text-sm font-medium text-[var(--fg-strong)] shadow-md backdrop-blur-sm transition hover:border-[var(--fg-muted)] min-[1280px]:hidden"
              aria-label="Toggle light and dark mode"
            >
              <span aria-hidden="true">{darkMode ? '☀︎︎' : '❍'}</span>
              {darkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
          
          {/* Hero Section */}
          <section id="about" className="scroll-mt-24 flex flex-col items-center mt-5 gap-8 rounded-2xl border border-[var(--border)] bg-[var(--panel)]/80 p-6 shadow-sm sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="flex-shrink-0">
              <img
                src={profileImage}
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-[var(--border)] object-cover shadow-md sm:h-36 sm:w-36"
              />
            </div>

            <div className="flex-1 space-y-5 text-center md:text-left">
              {/* <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--panel-alt)] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--fg-muted)]">
                Available for work
              </div> */}

              <div className="space-y-2">
                {/* <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                  Software engineer • data architect
                </p> */}
                <h1 className="text-4xl font-bold tracking-tight text-[var(--fg-strong)] sm:text-3xl">
                  Nicolás Muñoz Amrani
                </h1>
                <h2 className="text-xl font-semibold tracking-tight text-[var(--fg)] sm:text-2xl">
                  Junior Full-Stack Developer
                </h2>
              </div>

              <p className="max-w-xl text-base leading-relaxed text-[var(--fg)] sm:text-lg">
                Full-Stack Developer experienced in building agentic AI systems, RAG-powered graph engines, and backend-heavy skill set.
                Defined by a problem solving mindset, I like crafting clean and efficient solutions.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:justify-start">
                <span className="text-[var(--fg-muted)]">GitHub:</span>
                <a href="https://github.com/hoomanracer" target="_blank" rel="noreferrer" className="select-text break-all text-[var(--accent)] underline-offset-2 hover:underline">
                  github.com/hoomanracer
                </a>
                <span className="text-[var(--fg-muted)]">•</span>
                <span className="text-[var(--fg-muted)]">LinkedIn:</span>
                <a href="https://linkedin.com/in/nicolas-munoz-amrani" target="_blank" rel="noreferrer" className="select-text break-all text-[var(--accent)] underline-offset-2 hover:underline">
                  linkedin.com/in/nicolas-munoz-amrani
                </a>
              </div>
            </div>
          </section>

          {/*About */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-strong)]">About Me</h2>
            <p className="text-[var(--fg)]">
              22-year-old backend-leaning developer with deep interest in database design and management, focused on building server-side solutions, agentic AI engines, and end-to-end applications. Hands-on experience developing REST APIs and authentication with Java (Spring Boot, Hibernate, JWT), paired with LLM integration and RAG pipelines in Python using LangChain and Pandas during my internship at Accenture.
              <br />
              <br />
              Recently graduated in Multiplatform Application Development (DAM) with background in systems and networking (SMR), I want to continue growing as a developer by learning, contributing and owning new and challenging projects.  
            </p>
          </section>

          {/* Experience Section */}
          <section id="experience" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-strong)]">Experience</h2>
            <ExperienceList experiences={MY_EXPERIENCES} />
          </section>

          {/* Projects Section */}
          <section id="projects" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-strong)]">Featured Projects</h2>
            <ProjectList projects={MY_PROJECTS} />
          </section>

          {/* Education Section */}
          <section id="education" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-strong)]">Education</h2>
            <EducationList education={MY_EDUCATION} />
          </section>

          {/* Licenses Section */}
          <section id="licenses" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-strong)]">Licenses & Certifications</h2>
            <LicenseList licenses={MY_LICENSES} />
          </section>

        </main>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto px-6 py-8 border-t border-[var(--border)] text-sm text-[var(--fg-muted)] flex justify-between items-center">
          <p>{CURRENT_YEAR} · Nicolás Muñoz Amrani · :</p>
        </footer>

      </div>
    </div>
  );
}