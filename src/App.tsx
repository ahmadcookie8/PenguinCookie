import { useEffect, useMemo, useState } from 'react'
import penguinMascot from './assets/penguin-mascot.png'
import heroBg from './assets/hero-bg.png'
import heroBgLight from './assets/hero-bg-light.png'
import gamesArenaCard from './assets/card-games-arena.png'
import placeholderCard from './assets/card-placeholder.png'

const gamesUrl = 'https://games.penguincookie.ca'
const githubUrl = 'https://github.com/ahmadcookie8'

type Project = {
  id: string
  title: string
  description: string
  image: string
  status: 'Live' | 'Coming Soon'
  tags: string[]
  cta: string
  href?: string
}

const projects: Project[] = [
  {
    id: 'games-arena',
    title: 'Games Arena',
    description: 'Real-time multiplayer games - Tic Tac Toe, Chess, Wisecracker and more. Play with friends anywhere in the world.',
    image: gamesArenaCard,
    status: 'Live',
    tags: ['React', 'Socket.io', 'Node.js'],
    cta: 'Play Now',
    href: gamesUrl,
  },
  {
    id: 'coming-soon',
    title: '??? - Coming Soon',
    description: 'Something new is brewing. Check back later.',
    image: placeholderCard,
    status: 'Coming Soon',
    tags: ['TBD'],
    cta: 'Soon',
  },
  {
    id: 'more-projects',
    title: 'More Projects',
    description: 'This space will fill up. Always building.',
    image: placeholderCard,
    status: 'Coming Soon',
    tags: ['TBD'],
    cta: 'Soon',
  },
]

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.15 },
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('pc-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('pc-theme', 'light')
    }
  }, [isDark])

  return (
    <button
      type="button"
      onClick={() => setIsDark((current) => !current)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-11 w-11 items-center justify-center rounded-lg text-text-secondary transition-colors duration-150 hover:bg-overlay hover:text-text-primary md:h-9 md:w-9"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-surface/70 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6 lg:px-10">
        <a href="#" className="group flex items-center gap-3">
          <img src={penguinMascot} alt="" className="h-9 w-9 object-contain transition-transform group-hover:scale-105" />
          <span className="text-lg font-bold text-text-primary">Penguin<span className="text-brand-blue">Cookie</span></span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <a href="#projects" className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">Projects</a>
          <a href="#about" className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">About</a>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a href={gamesUrl} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-text-on-accent transition-colors hover:bg-accent-hover">Play Games Arena</a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-overlay hover:text-text-primary"
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-surface px-6 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-2">
            <a onClick={() => setIsOpen(false)} href="#projects" className="rounded-lg px-3 py-3 text-sm font-medium text-text-secondary hover:bg-elevated hover:text-text-primary">Projects</a>
            <a onClick={() => setIsOpen(false)} href="#about" className="rounded-lg px-3 py-3 text-sm font-medium text-text-secondary hover:bg-elevated hover:text-text-primary">About</a>
            <a href={gamesUrl} className="mt-2 rounded-lg bg-accent px-4 py-3 text-center text-sm font-medium text-text-on-accent transition-colors hover:bg-accent-hover">Play Games Arena</a>
          </div>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  const particles = useMemo(() => Array.from({ length: 30 }, (_, id) => ({
    id,
    top: `${(id * 37) % 100}%`,
    left: `${(id * 61 + 13) % 100}%`,
    delay: `${((id * 0.37) % 5).toFixed(2)}s`,
    duration: `${(2 + ((id * 0.29) % 3)).toFixed(2)}s`,
    size: id % 4 === 0 ? '2px' : '1px',
  })), [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <img src={heroBgLight} alt="" className="hero-bg-light absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 dark:opacity-0" />
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 dark:opacity-40" />
      <div className="hero-overlay absolute inset-0" />
      <div className="hero-grid absolute inset-0 pointer-events-none" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          style={{
            top: particle.top,
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            width: particle.size,
            height: particle.size,
          }}
          className="absolute rounded-full bg-white animate-twinkle pointer-events-none"
        />
      ))}

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <p className="hero-overline text-xs font-medium uppercase tracking-[0.2em]">Welcome to PenguinCookie</p>
        <img src={penguinMascot} alt="PenguinCookie mascot" className="mascot-glow h-32 w-32 animate-float object-contain sm:h-40 sm:w-40" />
        <h1 className="hero-title text-gradient text-5xl font-extrabold leading-[1.05] tracking-normal sm:text-6xl lg:text-7xl">
          <span className="block sm:inline">Games.</span>{' '}
          <span className="block sm:inline">Projects.</span>
        </h1>
        <p className="hero-subheadline max-w-lg text-lg leading-relaxed sm:text-xl">A personal corner of the internet for games, experiments, and projects by Ahmad.</p>
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <a href={gamesUrl} style={{ boxShadow: 'var(--glow-hero)' }} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-text-on-accent transition-colors hover:bg-accent-hover">
            Play Games Arena <ArrowRightIcon />
          </a>
          <a href="#projects" className="inline-flex min-h-12 items-center rounded-xl border border-border px-6 py-3 font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary">See Projects</a>
        </div>
      </div>

      <a href="#projects" aria-label="Scroll to projects" className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-text-muted">
        <ChevronDownIcon className="animate-float" />
      </a>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="reveal mb-14 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-brand-blue">What I've built</p>
        <h2 className="text-4xl font-extrabold text-text-primary sm:text-5xl">Projects</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-text-secondary">Things I build for fun and to learn.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div key={project.id} className="reveal" style={{ transitionDelay: `${index * 120}ms` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <article className="card-glow relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative h-48 overflow-hidden">
        <img src={project.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${project.status === 'Live' ? 'bg-success-subtle text-success-text' : 'bg-overlay text-text-muted'}`}>
            {project.status === 'Live' && <span className="h-1.5 w-1.5 rounded-full bg-success" />}
            {project.status}
          </span>
        </div>
        <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-text-secondary">{project.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-elevated px-2 py-0.5 font-mono text-xs text-text-muted">{tag}</span>
            ))}
          </div>
          <span className={`inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors ${project.href ? 'text-brand-blue hover:text-brand-blue-hover' : 'text-text-disabled'}`}>
            {project.cta} {project.href && <ArrowRightIcon />}
          </span>
        </div>
      </div>
    </article>
  )

  return project.href ? (
    <a href={project.href} className="group block h-full" aria-label={`${project.title}: ${project.cta}`}>
      {content}
    </a>
  ) : (
    <div className="group h-full" aria-disabled="true">
      {content}
    </div>
  )
}

function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row">
        <div className="reveal order-2 flex w-full flex-shrink-0 items-center justify-center lg:order-1 lg:w-80">
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
            <div className="absolute inset-8 rounded-full bg-accent-subtle opacity-60 blur-2xl" />
            <img src={penguinMascot} alt="" className="relative z-10 h-full w-full animate-float object-contain" />
            <OrbitChip className="-left-4 top-12" label="KH" />
            <OrbitChip className="-right-3 top-6" label="JJK" />
            <OrbitChip className="bottom-8 -left-1" label="JS" />
            <OrbitChip className="-right-5 bottom-14" label="AI" />
          </div>
        </div>

        <div className="reveal order-1 flex flex-col gap-5 text-left lg:order-2">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-blue">About</p>
          <h2 className="text-4xl font-extrabold text-text-primary">Hey, I'm Ahmad.</h2>
          <div className="space-y-3 text-base leading-relaxed text-text-secondary">
            <p>I'm a developer who builds things for fun - mostly games and web projects.</p>
            <p>PenguinCookie is my personal space where I experiment with ideas and share what I make.</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {['TypeScript', 'React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'].map((skill) => (
              <span key={skill} className="rounded-full border border-border bg-elevated px-3 py-1.5 text-sm font-medium text-text-secondary">{skill}</span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href={githubUrl} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 py-2 font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary">
              <GithubIcon /> GitHub
            </a>
            <a href={gamesUrl} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-accent/40 px-4 py-2 font-medium text-brand-blue transition-colors hover:border-accent hover:text-brand-blue-hover">
              Play Games Arena <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function OrbitChip({ className, label }: { className: string; label: string }) {
  return (
    <span className={`absolute z-20 flex h-11 min-w-11 items-center justify-center rounded-full border border-border bg-elevated px-2 font-mono text-xs font-semibold text-text-secondary shadow-md ${className}`}>
      {label}
    </span>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <img src={penguinMascot} alt="" className="h-7 w-7 object-contain" />
          <span className="text-sm font-semibold text-text-secondary">PenguinCookie</span>
        </div>
        <p className="text-sm text-text-muted">&copy; 2026 PenguinCookie. Made with care.</p>
        <div className="flex items-center gap-4">
          <a href={githubUrl} className="text-sm text-text-muted transition-colors hover:text-text-primary">GitHub</a>
          <a href={gamesUrl} className="text-sm text-text-muted transition-colors hover:text-text-primary">Games Arena</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()

  return (
    <div className="min-h-screen bg-page text-text-primary">
      <Nav />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

function ChevronDownIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.03 2C6.49 2 2 6.58 2 12.22c0 4.51 2.87 8.33 6.85 9.68.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.61-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.93.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.13-4.56-5.02 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.29.1-2.69 0 0 .84-.27 2.76 1.04a9.35 9.35 0 0 1 5.02 0c1.91-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.43.1 2.69.64.71 1.03 1.62 1.03 2.73 0 3.9-2.34 4.76-4.57 5.02.36.32.68.94.68 1.89 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.23 10.23 0 0 0 22 12.22C22 6.58 17.51 2 12.03 2Z" />
    </svg>
  )
}
