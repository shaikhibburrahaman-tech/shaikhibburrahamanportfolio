import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function Typewriter({ words }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(reduce ? words[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) {
      const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600)
      return () => clearInterval(id)
    }
    const word = words[index]
    const delay = deleting ? 35 : text === word ? 1400 : 75
    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') { setDeleting(false); setIndex((i) => (i + 1) % words.length) }
      else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(id)
  }, [text, deleting, index, words, reduce])

  return (
    <span className="typewriter" aria-live="off">
      <span className="gradient-text">{reduce ? words[index] : text}</span>
      {!reduce && <span className="caret" aria-hidden="true" />}
    </span>
  )
}
