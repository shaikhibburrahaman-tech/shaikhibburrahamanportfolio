import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="section-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </Reveal>
  )
}
