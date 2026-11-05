import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, MapPin, Send, XCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { GithubIcon, LinkedinIcon } from '../components/Brand.jsx'
import { useProfile } from '../ProfileContext.jsx'
import { api } from '../api.js'
import { isPlaceholder } from '../utils.js'

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name (at least 2 characters).'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address, like name@example.com.'
  if (v.subject.trim().length < 3) e.subject = 'Please add a short subject (at least 3 characters).'
  if (v.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.'
  if (v.message.length > 2000) e.message = 'Your message is too long (maximum 2000 characters).'
  return e
}

export default function Contact() {
  const p = useProfile()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', text: '' })

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) { setStatus({ type: 'idle', text: '' }); return }
    setStatus({ type: 'loading', text: '' })
    try {
      await api.sendContact({
        name: values.name.trim(), email: values.email.trim(), subject: values.subject.trim(),
        message: values.message.trim(), website: values.website,
      })
      setValues(EMPTY)
      setStatus({ type: 'success', text: 'Thank you! Your message has been sent. I will get back to you soon.' })
    } catch (err) {
      if (err.status === 400) {
        const server = {}
        for (const k of ['name', 'email', 'subject', 'message']) if (err.fields?.[k]) server[k] = [].concat(err.fields[k])[0]
        setErrors(server)
        setStatus({ type: 'error', text: 'Please fix the highlighted fields and try again.' })
      } else if (err.status === 429) {
        setStatus({ type: 'error', text: 'Too many messages from your connection. Please try again later.' })
      } else {
        setStatus({ type: 'error', text: 'Could not send your message right now. Please check your connection and try again.' })
      }
    }
  }

  const field = (id, label, props = {}) => (
    <div className={`field ${errors[id] ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {props.textarea ? (
        <textarea id={id} rows={6} value={values[id]} onChange={set(id)} maxLength={2000} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined} />
      ) : (
        <input id={id} type={props.type || 'text'} value={values[id]} onChange={set(id)} maxLength={props.max || 150} autoComplete={props.auto} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined} />
      )}
      {errors[id] && <span id={`${id}-err`} className="field-error" role="alert">{errors[id]}</span>}
    </div>
  )

  const loading = status.type === 'loading'
  const placeholderNote = isPlaceholder(p.email) || isPlaceholder(p.github_url) || isPlaceholder(p.linkedin_url)

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk" subtitle="Hiring, collaborating or just saying hello? Send a message and I will reply." />
      <section className="container section tight contact-grid">
        <Reveal className="card form-card">
          <form onSubmit={submit} noValidate>
            <div className="form-row">
              {field('name', 'Full name', { auto: 'name', max: 100 })}
              {field('email', 'Email', { type: 'email', auto: 'email' })}
            </div>
            {field('subject', 'Subject')}
            {field('message', 'Message', { textarea: true })}
            <div className="count muted small">{values.message.length}/2000</div>
            {/* Honeypot: hidden from people, bots tend to fill it */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? <><Loader2 size={18} className="spin" /> Sending...</> : <><Send size={18} /> Send message</>}
            </button>
            <AnimatePresence mode="wait">
              {(status.type === 'success' || status.type === 'error') && (
                <motion.div key={status.type} className={`toast ${status.type}`} role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {status.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  <span>{status.text}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <Reveal delay={0.12} className="contact-info">
          <div className="card">
            <h3>Contact information</h3>
            <ul className="info-list">
              <li><Mail size={18} /><a href={`mailto:${p.email}`}>{p.email}</a></li>
              <li><LinkedinIcon size={18} /><a href={p.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn profile</a></li>
              <li><GithubIcon size={18} /><a href={p.github_url} target="_blank" rel="noopener noreferrer">GitHub profile</a></li>
              {p.location && <li><MapPin size={18} /><span>{p.location}</span></li>}
            </ul>
            {placeholderNote && <p className="muted small">Some contact details above are placeholders until the real ones are added.</p>}
          </div>
        </Reveal>
      </section>
    </>
  )
}
