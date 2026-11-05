import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Brand.jsx'
import { useProfile } from '../ProfileContext.jsx'
import { isPlaceholder } from '../utils.js'

export default function Footer() {
  const p = useProfile()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Link to="/" className="brand"><span className="brand-mark">SH</span><span className="brand-text">{p.full_name}</span></Link>
          <p className="muted">Aspiring {p.headline}. Building practical, database-driven applications.</p>
        </div>
        <div>
          <h4>Pages</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/education">Education</Link></li>
            <li><Link to="/career">Career</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <div className="socials">
            <a href={p.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={p.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href={`mailto:${p.email}`} aria-label="Email"><Mail size={20} /></a>
          </div>
          {(isPlaceholder(p.github_url) || isPlaceholder(p.email)) && <p className="muted small">Contact links are placeholders for now.</p>}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} {p.full_name}. All rights reserved.</span>
        <span>React + Django</span>
      </div>
    </footer>
  )
}
