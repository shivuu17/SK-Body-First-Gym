import { useEffect, useRef, useState } from 'react'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import FloatingButtons from './components/common/FloatingButtons'
import ScrollTop from './components/common/ScrollTop'
import LoadingScreen from './components/common/LoadingScreen'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Gallery from './components/sections/Gallery'
import Plans from './components/sections/Plans'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [navTransition, setNavTransition] = useState(null)
  const navScrollTimerRef = useRef(null)
  const navHideTimerRef = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowLoadingScreen(false)
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    return () => {
      if (navScrollTimerRef.current) {
        window.clearTimeout(navScrollTimerRef.current)
      }
      if (navHideTimerRef.current) {
        window.clearTimeout(navHideTimerRef.current)
      }
    }
  }, [])

  const handleNavigate = (id, label) => {
    if (navScrollTimerRef.current) {
      window.clearTimeout(navScrollTimerRef.current)
    }

    if (navHideTimerRef.current) {
      window.clearTimeout(navHideTimerRef.current)
    }

    setNavTransition({ label })

    navScrollTimerRef.current = window.setTimeout(() => {
      const element = document.getElementById(id)

      if (element) {
        const offsetTop = element.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    }, 140)

    navHideTimerRef.current = window.setTimeout(() => {
      setNavTransition(null)
    }, 900)
  }

  return (
    <div className="App">
      {showLoadingScreen && <LoadingScreen />}
      {!showLoadingScreen && navTransition && (
        <div className="nav-transition" role="status" aria-live="polite" aria-label="Navigating section">
          <div className="nav-transition__panel">
            <div className="nav-transition__logo-wrap">
              <img src="/dumbell.png" alt="SK Body First Gym logo" className="nav-transition__logo" />
            </div>
            <div className="nav-transition__text">
              <span className="nav-transition__label">Opening</span>
              <span className="nav-transition__section">{navTransition.label}</span>
            </div>
            <div className="nav-transition__bar" aria-hidden="true">
              <span></span>
            </div>
          </div>
        </div>
      )}
      {!showLoadingScreen && (
        <>
          <Navbar onNavigate={handleNavigate} />
          <FloatingButtons />
          <Hero />
          <About />
          <Services />
          <Gallery />
          <Plans />
          <Testimonials />
          <Contact />
          <Footer />
          <ScrollTop />
        </>
      )}
    </div>
  )
}

export default App
