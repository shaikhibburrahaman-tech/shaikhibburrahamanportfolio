import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink, ImageIcon } from 'lucide-react'
import { GithubIcon } from './Brand.jsx'
import { isPlaceholder } from '../utils.js'

export function LinkChip({ href, icon, label, placeholderLabel }) {
  if (!href) return null
  if (isPlaceholder(href)) {
    return <span className="chip disabled" title="Placeholder link: real link not provided yet">{icon}{placeholderLabel}</span>
  }
  return <a className="chip" href={href} target="_blank" rel="noopener noreferrer">{icon}{label}</a>
}

export function Screenshot({ project, large = false }) {
  return (
    <div className={`shot ${large ? 'large' : ''}`}>
      {project.image_url ? (
        <img src={project.image_url} alt={`${project.title} screenshot`} loading="lazy" />
      ) : (
        <div className="shot-placeholder"><ImageIcon size={28} /><span>Screenshot placeholder</span></div>
      )}
    </div>
  )
}

export default function ProjectCard({ project, onOpen, to }) {
  const open = (e) => { if (onOpen) { e.preventDefault(); onOpen(project) } }
  const Wrapper = to ? Link : 'button'
  const wrapperProps = to ? { to } : { type: 'button', onClick: open }
  return (
    <motion.article className="card project-card" layout>
      <div className="shot-wrap">
        <Screenshot project={project} />
        <Wrapper className="shot-overlay" {...wrapperProps} aria-label={`View details of ${project.title}`}>
          <span>View Details</span>
        </Wrapper>
      </div>
      <h3>{project.title}</h3>
      <p className="muted">{project.short_description}</p>
      <ul className="badges">{project.technologies.map((t) => <li key={t}>{t}</li>)}</ul>
      <div className="card-actions">
        <Wrapper className="btn btn-sm btn-primary" {...wrapperProps}>View Details</Wrapper>
        <LinkChip href={project.github_url} icon={<GithubIcon size={15} />} label="GitHub" placeholderLabel="GitHub (placeholder)" />
        <LinkChip href={project.live_url} icon={<ExternalLink size={15} />} label="Live demo" placeholderLabel="Demo (placeholder)" />
      </div>
    </motion.article>
  )
}
