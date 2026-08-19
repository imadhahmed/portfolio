import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Certificates from './pages/Certificates'
import Achievements from './pages/Achievements'
import CV from './pages/CV'
import { logout } from './api/auth'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('admin_token')))
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleUnauthorized = () => setIsAuthenticated(false)
    window.addEventListener('auth:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized)
  }, [])

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
    setIsMobileMenuOpen(false)
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="flex min-h-screen bg-[#0b1014] relative overflow-x-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab)
          setIsMobileMenuOpen(false)
        }}
        onLogout={handleLogout}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Header
          user={{ email: 'admin@imadh.me' }}
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        />

        <main className="p-4 sm:p-6 md:p-8 flex-1 w-full max-w-full overflow-x-hidden">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'certificates' && <Certificates />}
          {activeTab === 'achievements' && <Achievements />}
          {activeTab === 'cv' && <CV />}
        </main>
      </div>
    </div>
  )
}
