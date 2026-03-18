import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import {
  FaArrowRight,
  FaCodeBranch,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaStar,
  FaUsers,
  FaYoutube,
} from 'react-icons/fa6'

type HighlightCard = {
  id: string
  title: string
  period: string
  summary: string
  tech: string
}

type GitHubProject = {
  name: string
  description: string
  language: string
  stars: number
  url: string
}

function App() {
  const sceneUrl = 'https://prod.spline.design/cZOzfWQ60bSXwxH3/scene.splinecode'
  const [activeCard, setActiveCard] = useState('EITECH')
  const [showSpline, setShowSpline] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.matchMedia('(min-width: 768px)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleViewportChange = (event: MediaQueryListEvent) => {
      setShowSpline(event.matches)
    }

    setShowSpline(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleViewportChange)

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange)
    }
  }, [])

  const highlights: HighlightCard[] = [
    {
      id: 'EITECH',
      title: 'EITECH Internship',
      period: 'Dec 2025 - Present',
      summary:
        'Built SEO-first booking interfaces, extended a C# ASP.NET DAL, and integrated Amadeus APIs in a Dockerized workflow.',
      tech: 'C#, ASP.NET, Vue.js, SQL, Docker, Amadeus GDS',
    },
    {
      id: 'HORIZON',
      title: 'Horizon Education',
      period: 'Feb 2025 - May 2025',
      summary:
        'Shipped admin and moderator dashboards for 70k+ users with advanced CRUD, secure redeem codes, and real-time insights.',
      tech: 'React, Node.js, Tailwind CSS, Firebase, JWT, Microservices',
    },
    {
      id: 'FREELANCE',
      title: 'GitHub & Freelance',
      period: '2023 - Present',
      summary:
        'Delivered full-stack platforms and algorithm-heavy software, from MERN apps to C++ audio engines and Java systems.',
      tech: 'React, Angular, Vue.js, C++, Java, Python, Docker, AWS',
    },
  ]

  const selectedCard = highlights.find((item) => item.id === activeCard) ?? highlights[0]

  const githubSnapshot = [
    {
      label: 'Public Repositories',
      value: '15+',
      icon: <FaCodeBranch className="text-sky-300" />,
    },
    {
      label: 'Followers',
      value: '26+',
      icon: <FaUsers className="text-emerald-300" />,
    },
    {
      label: 'Total Stars',
      value: '35+',
      icon: <FaStar className="text-amber-300" />,
    },
  ]

  const featuredProjects: GitHubProject[] = [
    {
      name: 'true-care',
      description:
        'AI-powered healthcare reimbursement platform with machine learning pipelines for claim prediction and fraud-aware validation.',
      language: 'JavaScript',
      stars: 9,
      url: 'https://github.com/medyassinekhlif/true-care',
    },
    {
      name: 'music-streamer',
      description:
        'C++ audio streaming engine that renders MIDI through JUCE and VST3 plugins for low-latency, real-time output.',
      language: 'C++',
      stars: 3,
      url: 'https://github.com/medyassinekhlif/music-streamer',
    },
    {
      name: 'hotel-booking',
      description:
        'Spring Boot and React booking workflow with persistent MySQL storage and a production-ready reservation flow.',
      language: 'JavaScript',
      stars: 3,
      url: 'https://github.com/medyassinekhlif/hotel-booking',
    },
    {
      name: 'relate-ai',
      description:
        'MERN application enhanced by Gemini API to generate personalized, story-based motivational experiences.',
      language: 'JavaScript',
      stars: 2,
      url: 'https://github.com/medyassinekhlif/relate-ai',
    },
  ]

  const youtubeChannelUrl = 'https://www.youtube.com/@mohamedyassinekhlif'
  const youtubeVideoUrl = 'https://www.youtube.com/watch?v=TL5n5-ucbo8&t=31s'
  const youtubeEmbedUrl = 'https://www.youtube.com/embed/TL5n5-ucbo8?start=31'
  const githubAvatarUrl = 'https://github.com/medyassinekhlif.png'
  const logoUrl = `${import.meta.env.BASE_URL}favicon.png`

  const skills = [
    ['Programming Languages', 'C, C++, C#, Java, JavaScript, Python, SQL'],
    ['Frontend Development', 'React, Angular, Vue.js, Tailwind CSS'],
    ['Backend Development', 'Node.js, Express.js, Java (Tomcat), RESTful APIs'],
    ['Databases', 'MongoDB, Relational Databases (SQL), Firebase'],
    ['DevOps & Deployment', 'Docker, Nginx, Kubernetes'],
    ['Architecture & Concepts', 'Microservices, Distributed Systems, OOP, MVC, JWT'],
    ['Artificial Intelligence', 'Machine Learning, PyTorch'],
  ]

  return (
    <main className="min-h-screen bg-slate-950 font-body text-slate-100">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <a
            href="#about"
            className="inline-flex items-center gap-2 font-display text-lg font-semibold text-sky-200"
          >
            <img
              src={logoUrl}
              alt="Logo"
              className="h-10 w-10 pr-1"
            />
            <span>Med Yassine Khlif</span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
            <a href="#about" className="transition hover:text-sky-200">
              About
            </a>
            <a href="#education" className="transition hover:text-emerald-200">
              Education
            </a>
            <a href="#skills" className="transition hover:text-rose-200">
              Skills
            </a>
            <a href="#github" className="transition hover:text-amber-200">
              GitHub
            </a>
            <a href="#youtube" className="transition hover:text-rose-200">
              YouTube
            </a>
          </div>
          <a
            href="https://github.com/medyassinekhlif"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-300/20 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition hover:scale-105"
          >
            <FaGithub /> Follow
          </a>
        </nav>
      </header>

      <section id="about" className="relative min-h-screen overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(56,189,248,0.22),transparent_36%),radial-gradient(circle_at_50%_78%,rgba(16,185,129,0.16),transparent_42%),radial-gradient(circle_at_85%_20%,rgba(251,191,36,0.14),transparent_38%)]" />
        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl gap-4 px-4 py-5 md:grid-cols-[1.08fr_0.92fr] md:gap-6 md:px-8 md:py-8">
          <div className="order-1">
            <div className="rounded-[30px] border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl md:p-10">
              <div className="mb-4 flex items-center gap-4 sm:gap-5">
                <img
                  src={githubAvatarUrl}
                  alt="Med Yassine Khlif GitHub avatar"
                  className="h-24 w-24 rounded-full border-2 border-amber-300/80 object-cover shadow-lg sm:h-28 sm:w-28"
                />
                <div className="min-w-0">
                  <p className="text-xs text-emerald-300 sm:text-sm">
                    Software Engineering Undergraduate
                  </p>
                  <h1 className="font-display text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                    Med Yassine Khlif
                  </h1>
                </div>
              </div>
              <p className="mt-4 text-base text-slate-200 md:text-lg">
                Building scalable full-stack products and intelligent software systems.
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-200">
                <p className="flex items-center gap-3">
                  <FaLocationDot className="text-sky-300" /> Monastir, Tunisia
                </p>
                <p className="flex items-center gap-3">
                  <FaEnvelope className="text-emerald-300" />
                  <a
                    href="mailto:medyassinekhlif@fsm.u-monastir.tn"
                    className="decoration-emerald-300/60 underline-offset-4"
                  >
                    medyassinekhlif@fsm.u-monastir.tn
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <FaGithub className="text-amber-300" />
                  <a
                    href="https://github.com/medyassinekhlif"
                    target="_blank"
                    rel="noreferrer"
                    className="decoration-amber-300/60 underline-offset-4"
                  >
                    github.com/medyassinekhlif
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <FaLinkedin className="text-violet-300" />
                  <a
                    href="https://linkedin.com/in/med-yassine-khlif"
                    target="_blank"
                    rel="noreferrer"
                    className="decoration-violet-300/60 underline-offset-4"
                  >
                    linkedin.com/in/med-yassine-khlif
                  </a>
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {highlights.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setActiveCard(card.id)}
                    className={`rounded-xl border p-4 text-left transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
                      activeCard === card.id
                        ? 'border-emerald-300/70 bg-emerald-300/15'
                        : 'border-white/15 bg-slate-900/45'
                    }`}
                  >
                    <p className="text-sm font-semibold text-slate-100">{card.title}</p>
                    <p className="mt-1 text-xs text-slate-300">{card.period}</p>
                  </button>
                ))}
              </div>

              <article className="mt-4 rounded-xl border border-emerald-300/25 bg-slate-900/50 p-4">
                <p className="text-sm font-semibold text-emerald-200">{selectedCard.title}</p>
                <p className="mt-2 text-sm text-slate-200">{selectedCard.summary}</p>
                <p className="mt-3 text-xs tracking-wide text-emerald-100">{selectedCard.tech}</p>
              </article>
            </div>
          </div>

          {showSpline ? (
            <div className="order-2">
              <div className="h-[46svh] overflow-hidden rounded-[28px] border border-white/15 bg-slate-900/40 shadow-2xl backdrop-blur-xl md:h-[calc(100svh-4rem)]">
                <Spline scene={sceneUrl} />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 md:px-6 md:py-14">
        <article id="youtube" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold text-rose-300">
              Example of Project from Horizon Education
            </h2>
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-rose-300/10 px-4 py-1.5 text-sm text-rose-100 transition hover:scale-105"
            >
              <FaYoutube /> @mohamedyassinekhlif
            </a>
          </div>

          <p className="mt-4 text-sm text-slate-300">
            Showcase video highlighting a real project delivery context from Horizon Education.
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-rose-300/30 bg-slate-950/80">
            <div className="aspect-video w-full">
              <iframe
                src={youtubeEmbedUrl}
                title="Horizon Education project example"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <a
            href={youtubeVideoUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-rose-200 transition hover:text-rose-100"
          >
            <FaYoutube /> Open this video on YouTube
          </a>
        </article>

        <article id="education" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-sky-300">Education</h2>
          <p className="mt-4 text-lg font-medium">
            Bachelor's Degree in Software Engineering (Expected June 2026)
          </p>
          <p className="mt-1 text-slate-300">Faculty of Sciences, Monastir</p>
          <p className="mt-1 text-slate-300">GPA: 15.13/20 | Top 7% of the cohort (256 students)</p>
          <p className="mt-4 text-slate-300">
            Relevant Coursework: Algorithms & Data Structures, Object-Oriented Programming,
            Operating Systems, Database Systems, Artificial Intelligence, Machine Learning,
            Cloud Computing & Virtualization, Distributed Systems & Microservices
          </p>
        </article>

        <article id="skills" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-rose-300">Technical Skills</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {skills.map(([title, values]) => (
              <div
                key={title}
                className="group rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition duration-200 hover:-translate-y-1 hover:border-rose-300/40"
              >
                <h3 className="text-sm font-semibold tracking-wide text-slate-200 group-hover:text-rose-200">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{values}</p>
              </div>
            ))}
          </div>
        </article>

        <article id="github" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold text-amber-300">GitHub Highlights</h2>
            <a
              href="https://github.com/medyassinekhlif"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-sm text-amber-100 transition hover:scale-105"
            >
              <FaGithub /> github.com/medyassinekhlif
            </a>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {githubSnapshot.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition duration-200 hover:-translate-y-1 hover:border-amber-300/40"
              >
                <div className="flex items-center gap-2 text-sm tracking-wide text-slate-300">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-slate-100">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition duration-200 hover:-translate-y-1 hover:border-amber-300/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-100 group-hover:text-amber-200">{project.name}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-300">
                    <FaStar /> {project.stars}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{project.description}</p>
                <p className="mt-3 text-xs tracking-wide text-amber-100">{project.language}</p>
              </a>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-violet-300">
            Languages, Interests & Soft Skills
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm font-semibold tracking-wide text-slate-200">Languages</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>Arabic: Native</li>
                <li>English: Fluent (IELTS 6.5)</li>
                <li>French: Fluent</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm font-semibold tracking-wide text-slate-200">Interests</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>Swimming</li>
                <li>Playing Music</li>
                <li>Exploring Philosophy</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm font-semibold tracking-wide text-slate-200">
                Soft Skills
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>Adaptability</li>
                <li>Communication</li>
                <li>Teamwork</li>
                <li>Scrum & Agile</li>
                <li>Collaboration</li>
              </ul>
            </div>
          </div>
        </article>
      </section>

      <a
        href="mailto:medyassinekhlif@fsm.u-monastir.tn"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-violet-300/50 bg-violet-300/20 px-4 py-2 text-sm font-semibold text-violet-100 backdrop-blur transition hover:scale-105"
      >
        <FaPhone /> Contact <FaArrowRight className="text-xs" />
      </a>
    </main>
  )
}

export default App
