import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'

// Official GitHub Logo SVG
const GithubIcon = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#services' },
  { label: 'WORK', href: '#work' },
  { label: 'ACHIEVEMENTS', href: '#certificates' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 40))
    return unsub
  }, [scrollY])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleScroll = (href) => {
    setMobileOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) {
        const yOffset = -80
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full h-24 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#0f1115]/95 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => {
            setMobileOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="text-xl font-bold tracking-widest uppercase text-white hover:opacity-80 transition-opacity"
        >
          IMADH<span className="text-[#00df8f]">.</span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleScroll(link.href)}
              className="text-xs font-semibold tracking-widest text-gray-400 uppercase hover:text-[#00df8f] transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00df8f] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/CV.pdf"
            download="Imadh_Ahmed_CV.pdf"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0d1116] bg-[#00df8f] px-4 py-2 rounded-full hover:bg-[#00b373] transition-all duration-300 shadow-[0_0_12px_rgba(0,223,143,0.3)] font-medium"
          >
            <Download size={14} />
            <span>Download CV</span>
          </a>

          <a
            href="https://github.com/imadhahmed"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-wider text-white border border-white/20 px-4 py-2 rounded-full hover:border-[#00df8f] hover:text-[#00df8f] transition-all duration-300 bg-white/5"
          >
            <GithubIcon size={15} />
            <span>GitHub</span>
          </a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScroll('#contact')}
            className="hidden sm:flex w-10 h-10 rounded-full border border-white/20 items-center justify-center hover:border-[#00df8f]/50 transition-colors duration-300 group"
            aria-label="Contact Imadh Ahmed"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00df8f] group-hover:shadow-[0_0_8px_rgba(0,223,143,0.8)] transition-shadow duration-300" />
          </motion.button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#00df8f] hover:text-[#00df8f] transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#0d1116]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleScroll(link.href)}
                  className="text-left text-base font-bold tracking-widest text-gray-200 uppercase hover:text-[#00df8f] transition-colors flex items-center justify-between py-1"
                >
                  <span>{link.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00df8f]" />
                </button>
              ))}

              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="/CV.pdf"
                  download="Imadh_Ahmed_CV.pdf"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d1116] bg-[#00df8f] px-4 py-3 rounded-full hover:bg-[#00b373] transition-colors shadow-[0_0_15px_rgba(0,223,143,0.3)]"
                >
                  <Download size={15} />
                  <span>Download CV</span>
                </a>

                <div className="flex items-center justify-between gap-4">
                  <a
                    href="https://github.com/imadhahmed"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-white border border-white/20 px-4 py-2.5 rounded-full hover:border-[#00df8f] hover:text-[#00df8f] transition-all bg-white/5"
                  >
                    <GithubIcon size={15} />
                    <span>GitHub</span>
                  </a>

                  <button
                    onClick={() => handleScroll('#contact')}
                    className="flex-1 px-5 py-2.5 rounded-full text-xs font-bold text-white border border-white/20 hover:border-[#00df8f] hover:text-[#00df8f] transition-colors"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
