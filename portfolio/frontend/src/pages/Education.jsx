import { motion } from 'framer-motion'
import { Award, BookOpen, GraduationCap, Medal, Sparkles } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { EmptyState, OfflineNotice, Skeleton } from '../components/States.jsx'
import { useApi } from '../hooks/useApi.js'
import { api } from '../api.js'
import { fallbackEducation } from '../data/fallback.js'

function ListCard({ icon: Icon, title, items, emptyText }) {
  return (
    <Reveal className="card">
      <h3 className="card-title"><Icon size={20} /> {title}</h3>
      {items.length === 0 ? (
        <p className="muted small">{emptyText}</p>
      ) : (
        <ul className="plain-list">
          {items.map((i) => (
            <li key={i.id}><strong>{i.title}</strong>{i.description && <span className="muted"> {i.description}</span>}</li>
          ))}
        </ul>
      )}
    </Reveal>
  )
}

export default function Education() {
  const { data, loading, offline } = useApi(api.education, fallbackEducation)

  return (
    <>
      <PageHeader eyebrow="Education" title="Academic background" subtitle="Engineering foundation, now applied to software development." />
      <section className="container section tight">
        {offline && <OfflineNotice />}
        {loading ? <Skeleton style={{ height: 200 }} /> : (
          <div className="timeline">
            {data.education.map((e, i) => (
              <motion.div key={e.id} className="tl-item" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <span className="tl-dot"><GraduationCap size={16} /></span>
                <div className="card">
                  <span className="badge-sm">{e.graduation_year || 'Graduation year: to be added'}</span>
                  <h3>{e.degree}</h3>
                  <p className="accent">{e.branch}</p>
                  <dl className="facts">
                    <div><dt>University</dt><dd>{e.university}</dd></div>
                    <div><dt>College</dt><dd>{e.college_name || 'To be added'}</dd></div>
                    {e.percentage && <div><dt>Percentage</dt><dd>{e.percentage}</dd></div>}
                  </dl>
                  {e.description && <p className="muted">{e.description}</p>}
                </div>
              </motion.div>
            ))}
            <motion.div className="tl-item" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <span className="tl-dot now"><Sparkles size={16} /></span>
              <div className="card">
                <span className="badge-sm">Ongoing</span>
                <h3>Self-driven software learning</h3>
                <p className="muted">Building projects in Python, MySQL and web technologies while learning Django and React.</p>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {!loading && (
        <section className="container section">
          <SectionHeading eyebrow="Learning" title="Technical learning and credentials" />
          <div className="grid grid-2">
            <ListCard icon={BookOpen} title="Technical learning" items={data.technical_learning} emptyText="Nothing listed yet." />
            <ListCard icon={BookOpen} title="Courses" items={data.courses} emptyText="No courses listed yet. They can be added in the admin panel." />
            <ListCard icon={Award} title="Certifications" items={data.certifications} emptyText="No certifications listed yet. They will appear here once added." />
            <ListCard icon={Medal} title="Achievements" items={data.achievements} emptyText="No achievements listed yet. They will appear here once added." />
          </div>
        </section>
      )}
    </>
  )
}
