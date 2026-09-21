
import React, { useRef, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { ProjectCard } from './components/ProjectCard';
import { SocialIcons } from './components/SocialIcons';
import { PROJECTS, SKILL_CATEGORIES, SOCIAL_LINKS, INSPIRATIONS, GEAR_CATEGORIES } from './constants';
import { ArrowDownIcon, MailIcon, SunIcon, MoonIcon } from './components/Icons';
import { ShuffleText } from './components/ShuffleText';
import { Splash } from './components/Splash';
import type { Project } from './types';

const FILTERS = ['All', 'AI', 'Next.js', 'React', 'SaaS'];

const App: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isAppVisible, setIsAppVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [philosophyVisible, setPhilosophyVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [gearVisible, setGearVisible] = useState(false);
  const [sparksVisible, setSparksVisible] = useState(false);
  
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [isGearSectionOpen, setIsGearSectionOpen] = useState(false);
  const [isSparksSectionOpen, setIsSparksSectionOpen] = useState(false);
  const [isButtonShuffling, setIsButtonShuffling] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isHarshuShuffling, setIsHarshuShuffling] = useState(false);
  const [theme, setTheme] = useState('dark');

  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsAppVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    setHeroAnimated(true);
    
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/meeharshu8685-dot/repos?sort=pushed&direction=desc');
        if (!response.ok) {
          throw new Error(`GitHub API responded with ${response.status}`);
        }
        const data = await response.json();
        
        const unwantedRepoNames = ['task-and-finance-manage', 'habitflow-frontend', 'habitflow', 'wikyn', 'inner-code'];

        const fetchedProjects: Project[] = data
          .filter((repo: any) => 
            !repo.fork && 
            repo.description && 
            repo.name !== 'meeharshu8685-dot' &&
            !unwantedRepoNames.includes(repo.name.toLowerCase())
          )
          .map((repo: any) => ({
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
            description: repo.description,
            imageUrl: `https://picsum.photos/seed/${repo.name}/1000/800`,
            tags: repo.topics || [],
            liveUrl: repo.homepage || undefined,
            repoUrl: repo.html_url,
          }));

        const curatedProjects = PROJECTS.filter(p => 
            p.title.includes('Pathfy') ||
            p.title.includes('CareSense AI') ||
            p.title.includes('MediGuardia') || 
            p.title.includes('ClinicWeb-Aura') ||
            p.title.includes('Schoolweb') ||
            p.title.includes('Blusdesk') || 
            p.title.includes('NotesNest') || 
            p.title.includes('Innerdecode') ||
            p.title.includes('Portfolio')
        );
        
        const allProjects = [
          ...curatedProjects,
          ...fetchedProjects.filter(p => {
            const normalizedTitle = p.title.toLowerCase().replace(/[^a-z0-9]/g, '');
            return !curatedProjects.some(cp => cp.title.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalizedTitle));
          })
        ].filter(Boolean) as Project[];

        if (allProjects.length > 0) {
          const finalProjects = allProjects.filter(p => !p.title.toLowerCase().includes('habitflow'));
          setProjects(finalProjects.slice(0, 10)); 
        }

      } catch (error) {
        console.error('Failed to fetch projects from GitHub. Falling back to static data.', error);
      }
    };

    fetchProjects();

  }, []);

  useEffect(() => {
    const shuffleDuration = 5000;
    const pauseDuration = 10000;
    const cycleDuration = shuffleDuration + pauseDuration;

    let timeoutId: number;
    let intervalId: number;

    const shuffleCycle = () => {
      setIsHarshuShuffling(true);
      timeoutId = window.setTimeout(() => {
        setIsHarshuShuffling(false);
      }, shuffleDuration);
    };
    
    const startDelay = setTimeout(() => {
        shuffleCycle();
        intervalId = window.setInterval(shuffleCycle, cycleDuration);
    }, 700);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === aboutRef.current) setAboutVisible(true);
            if (entry.target === skillsRef.current) setSkillsVisible(true);
            if (entry.target === philosophyRef.current) setPhilosophyVisible(true);
            if (entry.target === projectsRef.current) setProjectsVisible(true);
            if (entry.target === contactRef.current) setContactVisible(true);
            if (entry.target === gearRef.current) setGearVisible(true);
            if (entry.target === sparksRef.current) setSparksVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const refs = [aboutRef, skillsRef, philosophyRef, projectsRef, contactRef, gearRef, sparksRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [isLoading]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:meeharshu8686@gmail.com?subject=Hello from your portfolio!`;
  };

  const handleViewWorkClick = () => {
    scrollTo(projectsRef);
    setIsButtonClicked(true);
    setIsButtonShuffling(false);
  };

  const handleButtonMouseLeave = () => {
    if (!isButtonClicked) {
      setIsButtonShuffling(true);
    }
  };
  
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    return project.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
  });
  
  if (isLoading) {
    return <Splash onAnimationComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={`transition-opacity duration-1000 ease-in ${isAppVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
        <Header
          onAboutClick={() => scrollTo(aboutRef)}
          onProjectsClick={() => scrollTo(projectsRef)}
          onContactClick={() => scrollTo(contactRef)}
          onThemeToggle={toggleTheme}
          isDark={theme === 'dark'}
        />

        <main>
          {/* Hero Section */}
          <section className="h-screen w-full relative flex flex-col items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-black z-0"></div>
            <div className="relative z-10 px-4">
              <h1 className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none transition-all duration-700 ease-out ${heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <ShuffleText text="Harshu" isShuffling={isHarshuShuffling} shuffleInterval={200} shuffleProbability={0.03} />
              </h1>
              <p className={`mt-4 text-xl md:text-3xl font-semibold text-neutral-300 transition-all duration-700 ease-out delay-200 ${heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Innovate. Create. Develop.
              </p>
              <button
                onClick={handleViewWorkClick}
                onMouseEnter={() => setIsButtonShuffling(false)}
                onMouseLeave={handleButtonMouseLeave}
                className={`mt-8 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-300 flex items-center justify-center mx-auto transition-all duration-700 ease-out delay-400 ${heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <ShuffleText text="View Work" isShuffling={isButtonShuffling} /> <ArrowDownIcon className="ml-2" />
              </button>
            </div>
          </section>

          {/* About Section */}
          <Section ref={aboutRef} id="about" title="About Me" isSectionVisible={aboutVisible}>
            <div className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-lg text-neutral-600 dark:text-neutral-300 space-y-4 text-center">
                <p>
                  Hey there 👋 I’m Harshu — a B.Sc. Computer Science student at BITS Pilani who’s deeply curious about how tech shapes the world.
                </p>
                <p>
                  I’m into Artificial Intelligence, Machine Learning, Data Science, and Prompt Engineering — the stuff that makes machines a little smarter (and life a little cooler). Right now, I’m getting started with C language, but there’s a long way to go — and I’m all in for the ride.
                </p>
                 <p>
                  I’m kind of an introvert — I love my silence, and the calm that comes with being alone. Still, I’ve got a soft spot for nature, traveling, and my friends, who mean more to me than anything else.
                </p>
                <p>
                  I like keeping things simple: learn more, stay curious, and go with the flow 🌊
                </p>
              </div>
            </div>
          </Section>
          
          {/* Skills Section */}
          <Section ref={skillsRef} title="My Toolkit" isSectionVisible={skillsVisible}>
            <div className={`max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 skills-section-container ${skillsVisible ? 'section-is-visible' : ''}`}>
              {SKILL_CATEGORIES.map((category, index) => (
                <div 
                  key={category.title} 
                  className={`skill-card bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 rounded-lg flex flex-col h-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 ease-out ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center text-neutral-900 dark:text-white">
                    <category.icon className="w-6 h-6 mr-3 text-neutral-500 dark:text-neutral-400" />
                    {category.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4 text-sm leading-relaxed">
                    {category.skills.join(' · ')}
                  </p>
                  <p className="text-neutral-500 text-sm mt-auto italic">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
          
          {/* Philosophy Section */}
          <Section ref={philosophyRef} title="My Philosophy" isSectionVisible={philosophyVisible}>
              <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
                  {[{
                      title: "Simplicity First",
                      description: "Aiming for clean, elegant solutions. Because the most powerful ideas are often the simplest."
                  }, {
                      title: "Curiosity Driven",
                      description: "Embracing the \"why\" and \"what if.\" Every project is a new world to explore and learn from."
                  }, {
                      title: "Flow & Focus",
                      description: "Adapting to challenges while staying grounded in the goal. It's about progress, not perfection."
                  }].map((item, index) => (
                      <div 
                        key={item.title} 
                        className={`flex flex-col items-center transition-all duration-700 ease-out ${philosophyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                      >
                          <span className="text-5xl font-black text-neutral-300 dark:text-neutral-700 mb-2">0{index + 1}</span>
                          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                          <p className="text-neutral-600 dark:text-neutral-400">{item.description}</p>
                      </div>
                  ))}
              </div>
          </Section>

          {/* Inspirations Section */}
          <Section 
            ref={sparksRef}
            title="My Neural Sparks"
            isCollapsible={true}
            isOpen={isSparksSectionOpen}
            onTitleClick={() => setIsSparksSectionOpen(!isSparksSectionOpen)}
            isSectionVisible={sparksVisible}
          >
              <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {INSPIRATIONS.map((inspiration) => (
                      <div key={inspiration.name} className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 rounded-lg text-center hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300 flex flex-col items-center justify-center">
                          <inspiration.icon className="w-8 h-8 mb-3 text-neutral-500 dark:text-neutral-400" />
                          <h3 className="text-base font-bold text-neutral-900 dark:text-white">{inspiration.name}</h3>
                          <p className="text-neutral-500 text-sm mt-1">&mdash; {inspiration.motto}</p>
                      </div>
                  ))}
              </div>
              <div className="text-center mt-8 max-w-3xl mx-auto text-neutral-500 italic text-sm">
                  <p>Each one powers a different part of my system — curiosity, creativity, and authenticity.</p>
              </div>
          </Section>


          {/* Projects Section */}
          <Section ref={projectsRef} id="projects" title="Selected Work" isSectionVisible={projectsVisible}>
            <div className="flex justify-center flex-wrap gap-2 mb-12">
              {FILTERS.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ease-out ${
                    activeFilter === filter
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-transparent text-neutral-500 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div key={activeFilter} className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {filteredProjects.map((project, index) => (
                 <div
                    key={project.title}
                    className={`transition-all duration-700 ease-out ${projectsVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <ProjectCard project={project} />
                  </div>
              ))}
            </div>
          </Section>

          {/* Gear Section */}
          <Section 
            ref={gearRef}
            title="My Gear"
            isCollapsible={true}
            isOpen={isGearSectionOpen}
            onTitleClick={() => setIsGearSectionOpen(!isGearSectionOpen)}
            isSectionVisible={gearVisible}
          >
            <div className={`max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gear-section-container ${gearVisible ? 'section-is-visible' : ''}`}>
              {GEAR_CATEGORIES.map((category, index) => (
                <div key={category.title} className={`gear-card bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 rounded-lg text-center flex flex-col items-center hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 ease-out ${gearVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: `${index * 150}ms`}}>
                  <category.icon className="w-10 h-10 mb-4 text-neutral-500 dark:text-neutral-400" />
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">{category.title}</h3>
                  <ul className="text-neutral-600 dark:text-neutral-400 text-sm space-y-1 list-none p-0">
                    {category.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center mt-12 max-w-3xl mx-auto text-neutral-500 italic text-sm">
                <p>The tools and tech I use to bring ideas to life. This setup is always evolving with every new thing I learn.</p>
            </div>
          </Section>

          {/* Contact Section */}
          <Section ref={contactRef} id="contact" title="Connect With Me" isSectionVisible={contactVisible}>
              <div className="text-center max-w-2xl mx-auto">
                  <p className={`text-xl text-neutral-600 dark:text-neutral-300 mb-8 transition-all duration-700 ease-out ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      I'm currently seeking new opportunities and I'm always open to a chat. Whether you have a question, a project idea, or just want to say hi, feel free to reach out!
                  </p>
                  <button
                      onClick={handleEmailClick}
                      className={`inline-flex items-center justify-center text-xl font-bold text-white bg-black dark:text-black dark:bg-white px-10 py-5 group transition-all duration-700 ease-out hover:scale-105 ${contactVisible ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 translate-y-8'}`}>
                      <MailIcon className="mr-3 text-white dark:text-black" />
                      Say Hello
                  </button>
                   <div className={`mt-8 text-neutral-600 dark:text-neutral-400 transition-all duration-700 ease-out ${contactVisible ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8'}`}>
                      <p>Or reach out directly:</p>
                      <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                          <a href="mailto:meeharshu8686@gmail.com" className="font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors">meeharshu8686@gmail.com</a>
                          <span className="text-neutral-400 dark:text-neutral-600 hidden sm:inline">|</span>
                          <a href="mailto:iykharshu8685@gmail.com" className="font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors">iykharshu8685@gmail.com</a>
                      </div>
                  </div>
                  <div className={`mt-12 transition-all duration-700 ease-out ${contactVisible ? 'opacity-100 translate-y-0 delay-[450ms]' : 'opacity-0 translate-y-8'}`}>
                      <div className="flex justify-center">
                        <SocialIcons links={SOCIAL_LINKS} iconClassName="w-8 h-8" />
                      </div>
                  </div>
                  <div className={`mt-8 text-center transition-all duration-700 ease-out ${contactVisible ? 'opacity-100 translate-y-0 delay-[600ms]' : 'opacity-0 translate-y-8'}`}>
                    <button
                      onClick={toggleTheme}
                      className="p-3 rounded-full text-neutral-500 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-800/50 hover:text-black dark:hover:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 dark:focus:ring-offset-black"
                      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                      {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                    </button>
                  </div>
              </div>
          </Section>
        </main>

        <footer className="bg-neutral-200/50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 text-center py-8">
          <div className="container mx-auto px-6">
              <p className="text-neutral-500 text-sm">&copy; {new Date().getFullYear()} Harshu. All rights reserved.</p>
              <p className="text-neutral-600 text-xs mt-2">Inspired by the digital playground. Built with curiosity.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
