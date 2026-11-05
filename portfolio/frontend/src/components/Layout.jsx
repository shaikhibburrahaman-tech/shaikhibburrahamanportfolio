import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Projects from '../pages/Projects.jsx'
import Education from '../pages/Education.jsx'
import Career from '../pages/Career.jsx'
import Contact from '../pages/Contact.jsx'
import NotFound from '../pages/NotFound.jsx'

const TITLES = {
  '/': 'Shaik Hibbur Rahaman | Python Full-Stack Developer',
  '/about': 'About | Shaik Hibbur Rahaman',
  '/projects': 'Projects | Shaik Hibbur Rahaman',
  '/education': 'Education | Shaik Hibbur Rahaman',
  '/career': 'Career and Skills | Shaik Hibbur Rahaman',
  '/contact': 'Contact | Shaik Hibbur Rahaman',
}

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    document.title = TITLES[location.pathname] || 'Page not found | Shaik Hibbur Rahaman'
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
