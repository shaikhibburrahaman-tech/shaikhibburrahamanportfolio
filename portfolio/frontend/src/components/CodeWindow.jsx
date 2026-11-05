import { motion } from 'framer-motion'
import { Braces, Database, Terminal } from 'lucide-react'


/** Decorative coding-themed visual with floating tech icons. Content is illustrative, not a claim. */
export default function CodeWindow() {
  return (
    <div className="code-wrap" aria-hidden="true">
      <motion.div className="float-icon fi-1" animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <Terminal size={22} />
      </motion.div>
      <motion.div className="float-icon fi-2" animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <Database size={22} />
      </motion.div>
      <motion.div className="float-icon fi-3" animate={{ y: [0, -9, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <Braces size={22} />
      </motion.div>
      <div className="code-window">
        <div className="code-bar"><i /><i /><i /><span>developer.py</span></div>
        <pre>
          <code>
            <span className="kw">class</span> <span className="fn">Developer</span>:{'\n'}
            {'    '}<span className="kw">def</span> <span className="fn">__init__</span>(self):{'\n'}
            {'        '}self.name = <span className="st">"Shaik Hibbur Rahaman"</span>{'\n'}
            {'        '}self.stack = [{'\n'}
            {'            '}<span className="st">"Python"</span>, <span className="st">"Django"</span>,{'\n'}
            {'            '}<span className="st">"React"</span>, <span className="st">"MySQL"</span>{'\n'}
            {'        '}]{'\n'}
            {'\n'}
            {'    '}<span className="kw">def</span> <span className="fn">learn</span>(self):{'\n'}
            {'        '}<span className="kw">return</span> <span className="st">"always"</span>
          </code>
        </pre>
      </div>
    </div>
  )
}
