import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import ProjectCard, { LinkChip, Screenshot } from '../components/ProjectCard.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { EmptyState, OfflineNotice, SkeletonCards } from '../components/States.jsx'
import { GithubIcon } from '../components/Brand.jsx'
import { ExternalLink } from 'lucide-react'
import { useApi } from '../hooks/useApi.js'
import { api } from '../api.js'
import { fallbackProjects } from '../data/fallback.js'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'python', label: 'Python' },
  { key: 'database', label: 'Database' },
  { key: 'web', label: 'Web' },
]

export default function Projects() {
  const { data, loading, offline } = useApi(api.projects, fallbackProjects)
  const [params, setParams] = useSearchParams()
  const filter = params.get('category') || 'all'
  const selectedSlug = params.get('project')

  const update = (changes) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
    setParams(next, { replace: false })
  }

  const visible = useMemo(() => {
    if (!data) return []
    return filter === 'all' ? data : data.filter((p) => p.category === filter || p.technologies.map((t) => t.toLowerCase()).includes(filter))
  }, [data, filter])

  const selected = data?.find((p) => p.slug === selectedSlug) || null

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => e.key === 'Escape' && update({ project: '' })
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <>
      <PageHeader eyebrow="Projects" title="Selected work" subtitle="Practical applications built with Python, MySQL and core web technologies." />
      <section className="container section tight">
        {offline && <OfflineNotice />}
        <div className="filters" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f.key} role="tab" aria-selected={filter === f.key} className={`filter ${filter === f.key ? 'on' : ''}`} onClick={() => update({ category: f.key === 'all' ? '' : f.key })}>
              {f.label}
            </button>
          ))}
        </div>

        {loading ? <SkeletonCards /> : visible.length === 0 ? (
          <EmptyState title="No projects in this category">Try another filter.</EmptyState>
        ) : (
          <motion.div className="grid grid-3" layout>
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ delay: i * 0.05 }}>
                  <TiltCard><ProjectCard project={p} onOpen={(proj) => update({ project: proj.slug })} /></TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => update({ project: '' })}>
            <motion.div className="modal" role="dialog" aria-modal="true" aria-label={selected.title}
              initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}>
              <button className="icon-btn modal-close" onClick={() => update({ project: '' })} aria-label="Close details"><X size={18} /></button>
              <Screenshot project={selected} large />
              <h2>{selected.title}</h2>
              <ul className="badges">{selected.technologies.map((t) => <li key={t}>{t}</li>)}</ul>
              <p>{selected.description}</p>
              {selected.features?.length > 0 && (
                <>
                  <h3>Key features</h3>
                  <ul className="check-list">
                    {selected.features.map((f) => <li key={f}><CheckCircle2 size={16} />{f}</li>)}
                  </ul>
                </>
              )}
              <div className="card-actions">
                <LinkChip href={selected.github_url} icon={<GithubIcon size={15} />} label="Source code" placeholderLabel="GitHub (placeholder)" />
                <LinkChip href={selected.live_url} icon={<ExternalLink size={15} />} label="Live demo" placeholderLabel="Demo (placeholder)" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
