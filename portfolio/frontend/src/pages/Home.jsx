import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react'
import Typewriter from '../components/Typewriter.jsx'
import CodeWindow from '../components/CodeWindow.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { GithubIcon, LinkedinIcon } from '../components/Brand.jsx'
import { SkeletonCards } from '../components/States.jsx'
import TiltCard from '../components/TiltCard.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { useProfile } from '../ProfileContext.jsx'
import { useApi } from '../hooks/useApi.js'
import { api } from '../api.js'
import { fallbackProjects } from '../data/fallback.js'

const WORDS = ['Python Full-Stack Developer', 'React Developer', 'Software Developer']

export default function Home() {
  const p = useProfile()
  const { scrollY } = useScroll()
  const parallax = useTransform(scrollY, [0, 600], [0, -60])
  const { data: projects, loading } = useApi(api.projects, fallbackProjects)

  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <motion.span className="badge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="dot" /> Open to fresher software developer roles
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            Hi, I&apos;m <span className="gradient-text">{p.full_name}</span>
          </motion.h1>
          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <Typewriter words={WORDS} />
          </motion.p>
          <motion.p className="lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            {p.intro}
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <Link to="/projects" className="btn btn-primary">Explore My Projects <ArrowRight size={18} /></Link>
            <Link to="/about" className="btn btn-ghost">About Me</Link>
            <a href={p.resume_url} download className="btn btn-ghost"><Download size={18} /> Download Resume</a>
          </motion.div>
          <motion.div className="socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <a href={p.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={p.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href={`mailto:${p.email}`} aria-label="Email"><Mail size={20} /></a>
          </motion.div>
        </div>

        <motion.div className="hero-visual" style={{ y: parallax }}>
          <div className="avatar-ring">
            <div className="avatar" role="img" aria-label="Profile photo placeholder">
              <span>SHR</span>
              <small>Profile photo placeholder</small>
            </div>
          </div>
          <CodeWindow />
        </motion.div>

        <a href="#featured" className="scroll-indicator" aria-label="Scroll to featured projects">
          <span>Scroll</span><ChevronDown size={18} />
        </a>
      </section>

      <section id="featured" className="container section">
        <SectionHeading eyebrow="Featured work" title="Things I've built" subtitle="Database-driven Python applications and a responsive web app." />
        {loading ? <SkeletonCards /> : (
          <div className="grid grid-3">
            {projects.slice(0, 3).map((pr, i) => (
              <Reveal key={pr.id} delay={i * 0.08}>
                <TiltCard><ProjectCard project={pr} to={`/projects?project=${pr.slug}`} /></TiltCard>
              </Reveal>
            ))}
          </div>
        )}
        <Reveal className="center mt">
          <Link to="/projects" className="btn btn-ghost">View all projects <ArrowRight size={18} /></Link>
        </Reveal>
      </section>
    </>
  )
}
