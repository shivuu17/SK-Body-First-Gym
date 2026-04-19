import { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase/config'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import FloatingButtons from './components/common/FloatingButtons'
import ScrollTop from './components/common/ScrollTop'
import LoadingScreen from './components/common/LoadingScreen'
import FormModal from './components/FormModal'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'

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
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [adminUser, setAdminUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const navScrollTimerRef = useRef(null)
  const navHideTimerRef = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowLoadingScreen(false)
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Handle URL hash to navigate to admin panel
    const handleHashChange = () => {
      // Clean up URL if it has /admin in the path - redirect to hash-based routing only
      if (window.location.pathname.includes('/admin') && window.location.hash !== '#/admin') {
        window.location.hash = '#/admin'
        return
      }
      
      if (window.location.hash === '#/admin') {
        setCurrentPage('admin')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    // Check Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user)
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    // Sign out user when accessing admin panel to force re-login
    if (currentPage === 'admin' && adminUser) {
      signOut(auth).catch((error) => console.error('Logout error:', error))
    }
  }, [currentPage])

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
      {currentPage === 'admin' ? (
        authLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#0a0e27' }}>
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <p>Loading...</p>
            </div>
          </div>
        ) : adminUser ? (
          <AdminPanel onLogout={() => signOut(auth).then(() => window.location.hash = '#/')} />
        ) : (
          <AdminLogin onLogin={() => {}} />
        )
      ) : (
        <>
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
              <FormModal isOpen={isJoinFormOpen} onClose={() => setIsJoinFormOpen(false)} />
              <Navbar onNavigate={handleNavigate} onOpenJoinForm={() => setIsJoinFormOpen(true)} />
              <FloatingButtons onOpenJoinForm={() => setIsJoinFormOpen(true)} />
              <Hero onOpenJoinForm={() => setIsJoinFormOpen(true)} />
              <About />
              <Services onOpenJoinForm={() => setIsJoinFormOpen(true)} />
              <Gallery />
              <Plans onOpenJoinForm={() => setIsJoinFormOpen(true)} />
              <Testimonials />
              <Contact />
              <Footer />
              <ScrollTop />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App
