import { useRef } from 'react'

/** Subtle 3D tilt on hover (skipped for touch and reduced-motion users via CSS/media check). */
export default function TiltCard({ children, className = '', max = 7, ...rest }) {
  const ref = useRef(null)
  const allowed = () =>
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(hover: hover)').matches

  const onMove = (e) => {
    if (!allowed()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }

  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </div>
  )
}
