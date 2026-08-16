import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './globals.css'
import SpaceLayer from '../components/StdSpaceLayer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Teams from './pages/Teams'

// After navigating to "/#section" (e.g. clicking "contact" from /projects),
// the route change lands us on Home with a hash in the URL but the browser
// never auto-scrolls to it — that only happens on a hard page load. This
// scrolls to the matching element once Home's content is mounted.
function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => clearTimeout(timer)
  }, [location.pathname, location.hash])

  return null
}

export default function App() {
  return (
    <>
      <SpaceLayer />
      <Navbar />
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>

      <Footer />
    </>
  )
}
