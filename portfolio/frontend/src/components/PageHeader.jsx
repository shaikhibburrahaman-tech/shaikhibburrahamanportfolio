import { motion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="page-header container">
      <motion.span className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        {eyebrow}
      </motion.span>
      <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          {subtitle}
        </motion.p>
      )}
    </header>
  )
}
