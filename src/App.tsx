// src/App.tsx
import { useEffect, useRef, useState } from 'react';
import { ExperienceList, type Experience } from './components/ExperienceList';
import { ProjectList, type Project } from './components/ProjectList';
import { EducationList, type Education } from './components/EducationList';
import { LicenseList, type License } from './components/LicenseList';
import profileImage from './assets/grad_perfil.jpg';

const CURRENT_YEAR = new Date().getFullYear();
type Language = 'en' | 'es' | 'ca';
type SectionId = 'about' | 'experience' | 'projects' | 'education' | 'licenses';

const SECTION_LINKS = [
  { id: 'about' },
  { id: 'experience' },
  { id: 'projects' },
  { id: 'education' },
  { id: 'licenses' },
] as const;

const MY_EXPERIENCES: Record<Language, Experience[]> = {
  en: [
    {
      id: '1',
      title: 'Agentic AI Engineer Intern',
      company: 'Accenture - Madrid',
      highlights: [
        'Built and deployed agentic AI engine to create knowledge graphs in our Neo4j database, using Python, CrewAI, LangChain, Pandas, with an OpenAI API for structured and non-structured data intake, added embeddings and optimized processing.',
        'Refactored old LLM integration code bases and implemented new features improving performance and maintainability, documenting the codebase for future developers.',
      ],
      year: 2026,
      tags: ['Python', 'ETL', 'LangChain', 'CI/CD', 'Neo4j', 'RAG', 'LLM', 'CrewAI', 'OpenAI API', 'Pandas'],
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
      id: '3',
      title: 'Developer & IT Helpdesk Intern',
      company: 'GrandVoyage - Barcelona',
      highlights: [
        'Designed and implemented a web scraping engine using Python and Playwright for error and corrupt data tracking, optimzing fixes for production.',
        'Provided on-side IT support, troubleshooting and resolving technical issues for all departments, ensuring smooth operations and minimal downtime.',
      ],
      year: 2024,
      tags: ['Python', 'Playwright', 'SQL', 'Frontend', 'Helpdesk', 'IT Support'],
    },
  ],
  es: [
    {
      id: '1',
      title: 'Ingeniero de IA Agentica (Prácticas)',
      company: 'Accenture - Madrid',
      highlights: [
        'Diseñé e implementé un motor de IA agentica para crear grafos en Neo4j, usando Python, LangChain, Pandas y OpenAI API para procesar datos estructurados y no estructurados, añadiendo embeddings y optimizando los procesos.',
        'Refactoricé código antiguo de integración de LLMs y añadí nuevas funcionalidades para mejorar rendimiento, mantenibilidad y documenté todas las mejoras para facilitar futuros desarrollos.',
      ],
      year: 2026,
      tags: ['Python', 'ETL', 'LangChain', 'CI/CD', 'Neo4j', 'RAG', 'LLM', 'CrewAI', 'OpenAI API', 'Pandas'],
    },
    {
      id: '2',
      title: 'Ingeniero de IA Generativa (Prácticas)',
      company: 'Accenture - Madrid',
      highlights: [
        'Diseñé un motor de IA generativa y reconocimiento de imágenes con Python y modelos de Hugging Face ejecutados en CPU para detección, descripción y creación de imágenes en tiempo real, optimizado para ordenadores con pocos recursos.',
        'Realicé un seguimiento semanal de retos de entrenamiento, creando prototipos y comparando diversos motores de IA generativa hasta presentar un proyecto final al concluir de la beca inicial.',
      ],
      year: 2025,
      tags: ['Python', 'ML', 'OpenCV', 'SQL', 'Fine-Tuning'],
    },
    {
      id: '3',
      title: 'Desarrollador y soporte IT (Prácticas)',
      company: 'GrandVoyage - Barcelona',
      highlights: [
        'Diseñé e implementé un motor de scraping web con Python y Playwright para monitorizar errores y datos corruptos y corregir incidencias de producción.',
        'Proporcioné soporte técnico de forma presencial para todos los departamentos, resolviendo problemas y reduciendo tiempos de espera.',
      ],
      year: 2024,
      tags: ['Python', 'Playwright', 'SQL', 'Frontend', 'Helpdesk', 'IT Support'],
    },
  ],
  ca: [
    {
      id: '1',
      title: 'Enginyer d’IA agentica (Pràctiques)',
      company: 'Accenture - Madrid',
      highlights: [
        'Vaig dissenyar i implementar un motor d’IA agentica per crear grafs de coneixement a Neo4j, amb Python, LangChain, Pandas i OpenAI API per processar dades estructurades i no estructurades, afegint embeddings i optimitzant el flux.',
        'Vaig refactoritzar bases de codi d’integració amb LLM i vaig afegir noves funcionalitats per millorar rendiment, mantenibilitat i documentació per a futurs desenvolupadors.',
      ],
      year: 2026,
      tags: ['Python', 'ETL', 'LangChain', 'CI/CD', 'Neo4j', 'RAG', 'LLM', 'CrewAI', 'OpenAI API', 'Pandas'],
    },
    {
      id: '2',
      title: 'Enginyer d’IA generativa (Pràctiques)',
      company: 'Accenture - Madrid',
      highlights: [
        'Vaig dissenyar i provar un motor d’IA generativa i reconeixement d’imatges amb Python i models de Hugging Face executats en CPU per detectar, descriure i crear imatges en temps real, optimitzat per a ordinadors amb pocs recursos.',
        'Vaig seguir un repte setmanal de formació, creant prototips i comparant enfocaments fins a presentar un projecte final al final de la primera pràctica a Accenture.',
      ],
      year: 2025,
      tags: ['Python', 'ML', 'OpenCV', 'SQL', 'Fine-Tuning'],
    },
    {
      id: '3',
      title: 'Desenvolupador i suport IT (Pràctiques)',
      company: 'GrandVoyage - Barcelona',
      highlights: [
        'Vaig dissenyar i implementar un motor de web scraping amb Python i Playwright per monitoritzar errors i dades corruptes i corregir incidències de producció.',
        'Vaig oferir suport tècnic in situ a tots els departaments, resolent problemes i minimitzant temps d’aturada.',
      ],
      year: 2024,
      tags: ['Python', 'Playwright', 'SQL', 'Frontend', 'Helpdesk', 'IT Support'],
    },
  ],
};

const MY_PROJECTS: Record<Language, Project[]> = {
  en: [
    {
      id: '1',
      title: 'El Periódico de la Ingeniería App',
      description: 'Final project for my Multiplatform Application Development degree, a full-stack application with Java Spring Boot backend and React Native frontend, implementing JWT authentication, cryptography for user data and REST APIs.',
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
  ],
  es: [
    {
      id: '1',
      title: 'Aplicación El Periódico de la Ingeniería',
      description: 'Proyecto final del grado de Desarrollo de Aplicaciones Multiplataforma, con backend Java Spring Boot y frontend React Native, implementando autenticación JWT, cifrado de datos de usuario y APIs REST.',
      tags: ['Java', 'Spring Boot', 'React Native', 'Docker'],
      githubUrl: 'https://github.com/hoomanracer/app_ingenieria_final',
    },
    {
      id: '2',
      title: 'Sitio personal',
      description: 'Portfolio personal construido con React y TypeScript para mostrar experiencia, proyectos y contacto.',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/hoomanracer/portfolio',
    },
  ],
  ca: [
    {
      id: '1',
      title: 'Aplicació El Periódico de la Ingeniería',
      description: 'Projecte final del grau de Desenvolupament d’Aplicacions Multiplataforma, amb backend Java Spring Boot i frontend React Native, implementant autenticació JWT, xifratge per a dades d’usuari i APIs REST.',
      tags: ['Java', 'Spring Boot', 'React Native', 'Docker'],
      githubUrl: 'https://github.com/hoomanracer/app_ingenieria_final',
    },
    {
      id: '2',
      title: 'Lloc personal',
      description: 'Portfolio personal construït amb React i TypeScript per mostrar experiència, projectes i contacte.',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/hoomanracer/portfolio',
    },
  ],
};

const MY_EDUCATION: Record<Language, Education[]> = {
  en: [
    {
      id: '1',
      degree: 'Multiplatform Application Development Associate Degree (DAM)',
      institution: 'ESIC Business & Marketing School - Madrid',
      startYear: 2024,
      endYear: 2026,
      highlights: [
        'Final project involved building a full-stack application with Java Spring Boot backend and React Native frontend, implementing JWT authentication and caching layers, then presenting the app and all its features in a live demonstration with great success.',
        'Gained hands-on experience in mobile and web application development, cryptography, DBA, REST API development, and modern tech industry practices with a focus on both front-end and back-end work.',
      ],
      tags: ['Java', 'SQL', 'Spring Boot', 'React Native', 'Mobile Development', 'Full-Stack Development', 'DBA', 'Docker'],
    },
    {
      id: '2',
      degree: 'Systems and Networking Associate Degree (SMR)',
      institution: 'Stucom Còrsega - Barcelona',
      startYear: 2022,
      endYear: 2024,
      highlights: [
        'Completed a team project by building a server from hardware up, then installing Linux Server. Created a complete website with Apache, MySQL, contact forms using PHP, local mail, a ticket system, FTP, and DNS configuration, demonstrating everything live.',
        'Built foundational knowledge in computer systems, networking protocols, and IT infrastructure management.',
        'Simulated real-world networking scenarios, improving my problem-solving and troubleshooting skills.',
      ],
      tags: ['Networking', 'Linux Server', 'Windows Server', 'Apache', 'Bash', 'HTML/CSS', 'JavaScript', 'PHP'],
    },
  ],
  es: [
    {
      id: '1',
      degree: 'Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
      institution: 'ESIC Business & Marketing School - Madrid',
      startYear: 2024,
      endYear: 2026,
      highlights: [
        'El proyecto final consistió en crear una aplicación full-stack con backend Java Spring Boot y frontend React Native, implementando autenticación JWT, caché y demostración en directo de la aplicación y todas sus funcionalidades.',
        'Adquirí experiencia práctica en desarrollo móvil y web, criptografía, bases de datos, APIs REST y buenas prácticas del sector tecnológico.',
      ],
      tags: ['Java', 'SQL', 'Spring Boot', 'React Native', 'Desarrollo móvil', 'Full-Stack', 'DBA', 'Docker'],
    },
    {
      id: '2',
      degree: 'Grado Superior en Sistemas y Redes (SMR)',
      institution: 'Stucom Còrsega - Barcelona',
      startYear: 2022,
      endYear: 2024,
      highlights: [
        'Presentamos un proyecto en equipo construyendo un servidor desde su hardware hasta la instalación de Linux Server para poder desarrollar nuestra propia web. Diseñamos una web con Apache y MySQL, con formularios de contacto, correo local, sistema de tickets, FTP y DNS.',
        'Aprendí los fundamentos de los sistemas informáticos, protocolos de red e infraestructura IT.',
        'Simulé escenarios reales de incidencias de red y mejoré mis habilidades para resolver problemas.',
      ],
      tags: ['Networking', 'Linux Server', 'Windows Server', 'Apache', 'Bash', 'HTML/CSS', 'JavaScript', 'PHP'],
    },
  ],
  ca: [
    {
      id: '1',
      degree: 'Grau Superior en Desenvolupament d’Aplicacions Multiplataforma (DAM)',
      institution: 'ESIC Business & Marketing School - Madrid',
      startYear: 2024,
      endYear: 2026,
      highlights: [
        'El projecte final va consistir a crear una aplicació full-stack amb backend Java Spring Boot i frontend React Native, implementant autenticació JWT, caché i demostració en directe amb molt d’èxit.',
        'Vaig adquirir experiència pràctica en desenvolupament mòbil i web, criptografia, bases de dades, APIs REST i bones pràctiques del sector tecnològic.',
      ],
      tags: ['Java', 'SQL', 'Spring Boot', 'React Native', 'Desenvolupament mòbil', 'Full-Stack', 'DBA', 'Docker'],
    },
    {
      id: '2',
      degree: 'Grau Superior en Sistemes i Xarxes (SMR)',
      institution: 'Stucom Còrsega - Barcelona',
      startYear: 2022,
      endYear: 2024,
      highlights: [
        'Vaig acabar un projecte d’equip construint un servidor des del maquinari i després instal·lant Linux Server. Vaig dissenyar un lloc web amb Apache i MySQL, amb formularis de contacte, correu local, sistema de tiquets, FTP i DNS.',
        'Vaig aprendre els fonaments dels sistemes informàtics, protocols de xarxa i infraestructura IT.',
        'Vaig simular escenaris reals d’incidencies de xarxa i vaig millorar les meves habilitats per resoldre problemes.',
      ],
      tags: ['Networking', 'Linux Server', 'Windows Server', 'Apache', 'Bash', 'HTML/CSS', 'JavaScript', 'PHP'],
    },
  ],
};

const MY_LICENSES: Record<Language, License[]> = {
  en: [
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
      description: 'Proves knowledge of cloud concepts, core Azure architecture, and cloud management tools. The exam covers various cloud computing models (IaaS, PaaS, SaaS), Azure infrastructure services, security, and cost management strategies.',
      year: 2025,
      url: 'https://www.credly.com/badges/3f225dcb-7124-4b47-a68f-e6f767870bac/public_url',
    },
  ],
  es: [
    {
      id: '1',
      name: 'IT Specialist - Python',
      institution: 'Pearson VUE / Certiport',
      description: 'Demuestra competencia estructural en programación con Python y una sólida comprensión de lectura, escritura y entrega de código limpio.',
      year: 2026,
      url: 'https://www.credly.com/badges/4bd9da7a-056d-4e91-a2ad-2d334bf0137d/public_url',
    },
    {
      id: '2',
      name: 'Microsoft Certified: Azure Fundamentals AZ-900',
      institution: 'Microsoft / Pearson VUE',
      description: 'Demuestra conocimientos de conceptos cloud, arquitectura de Azure y herramientas de gestión. Cubre modelos de nube, servicios de infraestructura, seguridad y gestión de costes.',
      year: 2025,
      url: 'https://www.credly.com/badges/3f225dcb-7124-4b47-a68f-e6f767870bac/public_url',
    },
  ],
  ca: [
    {
      id: '1',
      name: 'IT Specialist - Python',
      institution: 'Pearson VUE / Certiport',
      description: 'Demostra competència estructural en programació amb Python i una comprensió sòlida de lectura, escriptura i depuració de codi net.',
      year: 2026,
      url: 'https://www.credly.com/badges/4bd9da7a-056d-4e91-a2ad-2d334bf0137d/public_url',
    },
    {
      id: '2',
      name: 'Microsoft Certified: Azure Fundamentals AZ-900',
      institution: 'Microsoft / Pearson VUE',
      description: 'Demostra coneixements de conceptes cloud, arquitectura central d’Azure i eines de gestió. Cobreix models de núvol, serveis d’infraestructura, seguretat i gestió de costos.',
      year: 2025,
      url: 'https://www.credly.com/badges/3f225dcb-7124-4b47-a68f-e6f767870bac/public_url',
    },
  ],
};

const SITE_CONTENT: Record<Language, {
  nav: Record<SectionId, string>;
  light: string;
  dark: string;
  githubLabel: string;
  linkedinLabel: string;
  heroRole: string;
  heroSummary: string;
  aboutTitle: string;
  aboutText: string;
  experienceTitle: string;
  projectsTitle: string;
  educationTitle: string;
  licensesTitle: string;
  presentLabel: string;
  projectGitHub: string;
  projectDemo: string;
  viewLicense: string;
}> = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      education: 'Education',
      licenses: 'Licenses',
    },
    light: 'Light',
    dark: 'Dark',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    heroRole: 'Junior Full-Stack Developer',
    heroSummary: 'Full-Stack Developer experienced in building agentic AI systems, RAG-powered graph engines, and backend-heavy applications. I enjoy solving problems and building clean, efficient solutions.',
    aboutTitle: 'About Me',
    aboutText: '22-year-old backend-leaning developer with a strong interest in database design and management, focused on server-side solutions, agentic AI engines, and end-to-end applications. I have hands-on experience developing REST APIs and authentication with Java (Spring Boot, Hibernate, JWT), along with LLM integration and RAG pipelines in Python using LangChain and Pandas during my internship at Accenture. Recently graduated in Multiplatform Application Development (DAM) with a background in systems and networking (SMR), I want to keep growing as a developer by learning, contributing, and owning new, challenging projects.',
    experienceTitle: 'Experience',
    projectsTitle: 'Featured Projects',
    educationTitle: 'Education',
    licensesTitle: 'Licenses & Certifications',
    presentLabel: 'Present',
    projectGitHub: 'GitHub',
    projectDemo: 'Live Demo',
    viewLicense: 'View License',
  },
  es: {
    nav: {
      about: 'Sobre mí',
      experience: 'Experiencia',
      projects: 'Proyectos',
      education: 'Educación',
      licenses: 'Licencias',
    },
    light: 'Claro',
    dark: 'Oscuro',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    heroRole: 'Desarrollador Full-Stack Junior',
    heroSummary: 'Desarrollador Full-Stack con experiencia en sistemas de IA agentica, motores de grafos impulsados por RAG y soluciones con enfoque en backend. Me caracteriza una mentalidad resolutiva y me gusta entregar soluciones limpias y eficientes.',
    aboutTitle: 'Sobre mí',
    aboutText: 'Desarrollador backend-leaning de 22 años con gran interés por el diseño y la gestión de bases de datos, enfocado en soluciones de servidor, motores de IA agentica y aplicaciones end-to-end. Tengo experiencia práctica desarrollando APIs REST y autenticación con Java (Spring Boot, Hibernate, JWT), además de integración con LLM y pipelines RAG en Python usando LangChain y Pandas durante mi beca en Accenture. Recientemente graduado en Desarrollo de Aplicaciones Multiplataforma (DAM) con formación en sistemas y redes (SMR), quiero seguir creciendo como desarrollador, aprendiendo y contribuyendo a proyectos nuevos y exigentes.',
    experienceTitle: 'Experiencia',
    projectsTitle: 'Proyectos destacados',
    educationTitle: 'Educación',
    licensesTitle: 'Licencias y certificaciones',
    presentLabel: 'Actualidad',
    projectGitHub: 'GitHub',
    projectDemo: 'Demo en vivo',
    viewLicense: 'Ver licencia',
  },
  ca: {
    nav: {
      about: 'Sobre mi',
      experience: 'Experiència',
      projects: 'Projectes',
      education: 'Educació',
      licenses: 'Llicències',
    },
    light: 'Clar',
    dark: 'Fosc',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    heroRole: 'Desenvolupador Full-Stack Junior',
    heroSummary: 'Desenvolupador Full-Stack amb experiència en sistemes d’IA agentica, motors de grafs impulsats per RAG i solucions amb enfocament en el backend. Em caracteritza una mentalitat resolutiva i m’agrada lliurar solucions netes i eficients.',
    aboutTitle: 'Sobre mi',
    aboutText: 'Desenvolupador amb interès en el backend de 22 anys amb gran interès pel disseny i la gestió de bases de dades, enfocat en solucions de servidor, motors d’IA agentica i aplicacions end-to-end. Tinc experiència pràctica desenvolupant APIs REST i autenticació amb Java (Spring Boot, Hibernate, JWT), a més d’integració amb LLM i pipelines RAG en Python amb LangChain i Pandas durant la meva beca a Accenture. Recentment graduat en Desenvolupament d’Aplicacions Multiplataforma (DAM) amb formació en sistemes i xarxes (SMR), vull seguir creixent com a desenvolupador, aprenent i contribuint en projectes nous i exigents.',
    experienceTitle: 'Experiència',
    projectsTitle: 'Projectes destacats',
    educationTitle: 'Educació',
    licensesTitle: 'Llicències i certificacions',
    presentLabel: 'Actualitat',
    projectGitHub: 'GitHub',
    projectDemo: 'Demo en viu',
    viewLicense: 'Veure llicència',
  },
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>('es');
  const [activeSection, setActiveSection] = useState<SectionId>('about');
  const activeSectionIndex = SECTION_LINKS.findIndex(({ id }) => id === activeSection);
  const content = SITE_CONTENT[language];

  const mobileNavButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobileNavListRef = useRef<HTMLUListElement | null>(null);
  const navTouchingRef = useRef(false);
  const navSwipingRef = useRef(false);
  const navStartLeftRef = useRef(0);
  const navSettleTimerRef = useRef<number | null>(null);
  const selectionLockUntilRef = useRef(0);

  const centerMobileNavItem = (sectionId: string) => {
    if (navSwipingRef.current) return;
    const index = SECTION_LINKS.findIndex(({ id }) => id === sectionId);
    const activeButton = mobileNavButtonRefs.current[index];
    const navList = mobileNavListRef.current;
    if (!activeButton || !navList) return;

    const targetLeft = activeButton.offsetLeft + activeButton.offsetWidth / 2 - navList.clientWidth / 2;
    navList.scrollTo({ left: targetLeft, behavior: 'smooth' });
  };

  const settleNavSwipe = () => {
    const navList = mobileNavListRef.current;
    navSwipingRef.current = false;
    if (!navList) return;
    if (Math.abs(navList.scrollLeft - navStartLeftRef.current) < 3) return;

    const center = navList.scrollLeft + navList.clientWidth / 2;
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;

    mobileNavButtonRefs.current.forEach((button, index) => {
      if (!button) return;
      const distance = Math.abs(button.offsetLeft + button.offsetWidth / 2 - center);
      if (distance < best) {
        best = distance;
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
      let closestId: SectionId = SECTION_LINKS[0].id;
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
          setActiveSection(visibleEntries[0].target.id as SectionId);
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

  const scrollToSection = (id: SectionId, behavior: ScrollBehavior = 'smooth') => {
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
            {SECTION_LINKS.map(({ id }) => {
              const isActive = activeSection === id;
              const label = content.nav[id];

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

        <div className="fixed right-5 top-5 z-50 hidden items-center gap-2 min-[1280px]:flex">
          <div className="flex h-11 items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--panel)]/85 p-1 shadow-md backdrop-blur-sm">
            {(['en', 'es', 'ca'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`flex h-9 min-w-10 items-center justify-center rounded-full px-2 text-[11px] font-semibold tracking-wide transition ${
                  language === lang ? 'bg-[var(--panel-alt)] text-[var(--fg-strong)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg-strong)]'
                }`}
                aria-label={`Switch language to ${lang.toUpperCase()}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)]/85 px-3 text-sm font-medium text-[var(--fg-strong)] shadow-md backdrop-blur-sm transition hover:border-[var(--fg-muted)]"
            aria-label="Toggle light and dark mode"
          >
            <span aria-hidden="true">{darkMode ? '☀︎︎' : '❍'}</span>
            {darkMode ? content.light : content.dark}
          </button>
        </div>

        <div className="fixed inset-x-0 top-0 z-40 px-3 pt-3 min-[1280px]:hidden">
          <div className="mx-auto flex w-full max-w-[calc(100%-1.5rem)] items-center justify-center gap-2 sm:max-w-4xl">
            <div className="flex h-11 items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--panel)]/85 p-1 shadow-md backdrop-blur-sm">
              {(['en', 'es', 'ca'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`flex h-9 min-w-8 items-center justify-center rounded-full px-2 text-[10px] font-semibold tracking-wide transition ${
                    language === lang ? 'bg-[var(--panel-alt)] text-[var(--fg-strong)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg-strong)]'
                  }`}
                  aria-label={`Switch language to ${lang.toUpperCase()}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <div
              className="h-11 min-w-[132px] flex-1 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--panel)]/85 shadow-md backdrop-blur-sm"
            >
              <div
                className="h-full"
                style={{
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
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
                  {SECTION_LINKS.map(({ id }, index) => {
                    const isActive = activeSection === id;
                    const distance = Math.abs(index - activeSectionIndex);
                    const opacity = isActive ? 1 : distance === 1 ? 0.72 : distance === 2 ? 0.38 : 0.18;
                    const label = content.nav[id];

                    return (
                      <li key={id} className="shrink-0 snap-center">
                        <button
                          ref={(element) => {
                            mobileNavButtonRefs.current[index] = element;
                          }}
                          type="button"
                          onClick={() => scrollToSection(id)}
                          className={`flex h-9 items-center rounded-full px-2 text-[10px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
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
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)]/85 px-3 text-sm font-medium text-[var(--fg-strong)] shadow-md backdrop-blur-sm transition hover:border-[var(--fg-muted)] min-[1280px]:hidden"
              aria-label="Toggle light and dark mode"
            >
              <span aria-hidden="true">{darkMode ? '☀︎︎' : '❍'}</span>
              {darkMode ? content.light : content.dark}
            </button>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
          <section id="about" className="scroll-mt-24 flex flex-col items-center mt-5 gap-8 rounded-2xl border border-[var(--border)] bg-[var(--panel)]/80 p-6 shadow-sm sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="flex-shrink-0">
              <img
                src={profileImage}
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-[var(--border)] object-cover shadow-md sm:h-36 sm:w-36"
              />
            </div>

            <div className="flex-1 space-y-5 text-center md:text-left">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-[var(--fg-strong)] sm:text-3xl">
                  Nicolás Muñoz Amrani
                </h1>
                <h2 className="text-xl font-semibold tracking-tight text-[var(--fg)] sm:text-2xl">
                  {content.heroRole}
                </h2>
              </div>

              <p className="max-w-xl text-base leading-relaxed text-[var(--fg)] sm:text-lg">
                {content.heroSummary}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:justify-start">
                <span className="text-[var(--fg-muted)]">{content.githubLabel}:</span>
                <a href="https://github.com/hoomanracer" target="_blank" rel="noreferrer" className="select-text break-all text-[var(--accent)] underline-offset-2 hover:underline">
                  github.com/hoomanracer
                </a>
                <span className="text-[var(--fg-muted)]">•</span>
                <span className="text-[var(--fg-muted)]">{content.linkedinLabel}:</span>
                <a href="https://linkedin.com/in/nicolas-munoz-amrani" target="_blank" rel="noreferrer" className="select-text break-all text-[var(--accent)] underline-offset-2 hover:underline">
                  linkedin.com/in/nicolas-munoz-amrani
                </a>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-strong)]">{content.aboutTitle}</h2>
            <p className="text-[var(--fg)]">{content.aboutText}</p>
          </section>

          <section id="experience" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-strong)]">{content.experienceTitle}</h2>
            <ExperienceList experiences={MY_EXPERIENCES[language]} />
          </section>

          <section id="projects" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-strong)]">{content.projectsTitle}</h2>
            <ProjectList
              projects={MY_PROJECTS[language]}
              githubLabel={content.projectGitHub}
              liveDemoLabel={content.projectDemo}
            />
          </section>

          <section id="education" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-strong)]">{content.educationTitle}</h2>
            <EducationList education={MY_EDUCATION[language]} presentLabel={content.presentLabel} />
          </section>

          <section id="licenses" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-strong)]">{content.licensesTitle}</h2>
            <LicenseList licenses={MY_LICENSES[language]} viewLicenseLabel={content.viewLicense} />
          </section>
        </main>

        <footer className="max-w-4xl mx-auto px-6 py-8 border-t border-[var(--border)] text-sm text-[var(--fg-muted)] flex justify-between items-center">
          <p>{CURRENT_YEAR} · Nicolás Muñoz Amrani</p>
        </footer>
      </div>
    </div>
  );
}
