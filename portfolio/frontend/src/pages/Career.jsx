import { motion } from 'framer-motion'
import { Download, Heart, MapPin, Quote, Route, Target } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { OfflineNotice, Skeleton } from '../components/States.jsx'
import { useApi } from '../hooks/useApi.js'
import { useProfile } from '../ProfileContext.jsx'
import { api } from '../api.js'
import { levelIndex } from '../utils.js'
import { fallbackCareer, fallbackSkills } from '../data/fallback.js'

const GROUPS = [
  { key: 'language', title: 'Languages' },
  { key: 'frontend', title: 'Frontend' },
  { key: 'backend', title: 'Backend and data' },
  { key: 'tools', title: 'Tools and technologies' },
]

function Level({ level, label }) {
  const filled = levelIndex(level)
  return (
    <div className="level" role="img" aria-label={`${label}: level ${filled} of 5`}>
      <div className="level-bars">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span key={i} className={i < filled ? 'on' : ''}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }} />
        ))}
      </div>
      <small>{label}</small>
    </div>
  )
}

function Block({ icon: Icon, title, items, empty }) {
  return (
    <Reveal className="card">
      <h3 className="card-title"><Icon size={20} /> {title}</h3>
      {items.length === 0 ? <p className="muted small">{empty}</p> : (
        <ul className="plain-list">
          {items.map((i) => <li key={i.id}><strong>{i.title}</strong>{i.description && <span className="muted"> {i.description}</span>}</li>)}
        </ul>
      )}
    </Reveal>
  )
}

export default function Career() {
  const profile = useProfile()
  const fb = { profile, skills: fallbackSkills, ...fallbackCareer }
  const { data, loading, offline } = useApi(api.career, fb)

  return (
    <>
      <PageHeader eyebrow="Career and skills" title="Ready to start as a software developer" subtitle="A fresher with hands-on Python, SQL and web projects, and a clear plan for growth." />
      <section className="container section tight">
        {offline && <OfflineNotice />}
        <Reveal className="objective card">
          <Quote size={28} aria-hidden="true" />
          <div>
            <h2>Career objective</h2>
            <p className="lead">&ldquo;{(data?.profile || profile).career_objective}&rdquo;</p>
            <a href={profile.resume_url} download className="btn btn-primary"><Download size={18} /> Download Resume</a>
          </div>
        </Reveal>
      </section>

      <section className="container section">
        <SectionHeading eyebrow="Technical skills" title="Skills and proficiency" subtitle="Levels are shown honestly: Python, SQL and JavaScript at an intermediate level, the rest still growing." />
        {loading ? <Skeleton style={{ height: 260 }} /> : GROUPS.map((g) => {
          const items = data.skills.filter((s) => s.category === g.key)
          if (!items.length) return null
          return (
            <div key={g.key} className="skill-group">
              <h3>{g.title}</h3>
              <div className="grid grid-3">
                {items.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.06} className="card skill-card">
                    <strong>{s.name}</strong>
                    <Level level={s.level} label={s.level_label} />
                  </Reveal>
                ))}
              </div>
            </div>
          )
        })}
        <p className="muted small center">Scale: Learning, Beginner, Intermediate, Proficient, Advanced.</p>
      </section>

      {!loading && (
        <section className="container section">
          <div className="grid grid-3">
            <Block icon={Heart} title="Career interests" items={data.interests} empty="Nothing listed yet." />
            <Block icon={Route} title="Learning roadmap" items={data.roadmap} empty="Nothing listed yet." />
            <Block icon={Target} title="Interview preparation" items={data.preparation} empty="Nothing listed yet." />
          </div>
          <Reveal className="center mt muted"><MapPin size={14} style={{ verticalAlign: '-2px' }} /> Looking for fresher software developer opportunities.</Reveal>
        </section>
      )}
    </>
  )
}
