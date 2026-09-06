import { useEffect } from 'react'
import { Routes, Route, useLocation, matchPath } from 'react-router-dom'
import './globals.css'
import SpaceLayer from '../components/StdSpaceLayer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Teams from './pages/Teams'
import CaseStudy from './pages/CaseStudy/CaseStudy'

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
  const location = useLocation()
  const isCaseStudy = matchPath('/projects/:id', location.pathname)

  return (
    <>
      <SpaceLayer />
      {!isCaseStudy && <Navbar />}
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<CaseStudy />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>

      <Footer />
    </>
  )
}