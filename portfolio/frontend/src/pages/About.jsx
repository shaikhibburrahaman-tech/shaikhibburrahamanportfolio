import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'framer-motion'
import { Brain, Compass, GraduationCap, RefreshCw, Target, Wrench } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CodeWindow from '../components/CodeWindow.jsx'
import { useCountUp } from '../hooks/useCountUp.js'
import { useApi } from '../hooks/useApi.js'
import { useProfile } from '../ProfileContext.jsx'
import { api } from '../api.js'
import { fallbackProjects, fallbackSkills } from '../data/fallback.js'

function Stat({ value, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const n = useCountUp(value, inView)
  return (
    <div className="card stat" ref={ref}>
      <strong className="gradient-text">{n}</strong>
      <span>{label}</span>
    </div>
  )
}

const strengths = [
  { icon: RefreshCw, title: 'Adaptability', text: 'Moved from electronics into software and picked up new tools along the way.' },
  { icon: Brain, title: 'Continuous learning', text: 'Keeps extending the stack: Python, SQL, JavaScript, Django and React.' },
  { icon: Wrench, title: 'Problem solving', text: 'Breaks real needs, like billing and stock handling, into working software.' },
]

export default function About() {
  const p = useProfile()
  const { data: projects } = useApi(api.projects, fallbackProjects)
  const { data: skills } = useApi(api.skills, fallbackSkills)
  const intermediate = (skills || []).filter((s) => s.level === 'intermediate').length

  return (
    <>
      <PageHeader eyebrow="About me" title="From circuits to code" subtitle="An ECE graduate building a career in Python full-stack development." />

      <section className="container section tight about-grid">
        <Reveal>
          <h2>Hi, I&apos;m {p.full_name}</h2>
          <p className="lead">{p.intro}</p>
          <p>
            I studied Electronics and Communication Engineering, and along the way I found that I enjoy building software more than anything else.
            That led me to Python, databases and the web, and I have been learning and building ever since.
          </p>
          <p>
            I am especially interested in Python full-stack development: designing the database, writing the backend logic and shaping the interface people actually use.
            My goal is to join a team as a software developer, work on real-world projects and keep growing as an engineer.
          </p>
          <div className="cta-row">
            <Link to="/projects" className="btn btn-primary">See my projects</Link>
            <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
          </div>
        </Reveal>
        <Reveal delay={0.15}><CodeWindow /></Reveal>
      </section>

      <section className="container section tight">
        <div className="grid grid-4">
          <Stat value={(projects || []).length} label="Projects built" />
          <Stat value={1} label="B.Tech degree (ECE)" />
          <Stat value={intermediate} label="Intermediate-level skills" />
          <Stat value={(skills || []).length} label="Technologies in my toolkit" />
        </div>
      </section>

      <section className="container section">
        <SectionHeading eyebrow="Journey" title="How I got here" />
        <div className="grid grid-3">
          {[
            { icon: GraduationCap, title: 'Electronics and Communication', text: 'B.Tech in ECE from JNTU-GV, Vizianagaram: a strong base in logical and analytical thinking.' },
            { icon: Compass, title: 'Moving into software', text: 'Started building with Python and SQL, then added web technologies and full-stack frameworks.' },
            { icon: Target, title: 'Career goal', text: 'Start as a software developer and apply Python full-stack skills to real-world projects.' },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="card feature">
              <span className="icon-chip"><c.icon size={22} /></span>
              <h3>{c.title}</h3>
              <p className="muted">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionHeading eyebrow="Strengths" title="What I bring" />
        <div className="grid grid-3">
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="card feature">
              <span className="icon-chip"><s.icon size={22} /></span>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
