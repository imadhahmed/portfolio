import { motion } from 'framer-motion'
import { ArrowUpRight, Quote, Code2 } from 'lucide-react'
import DaysICodeFooter from './DaysICodeFooter'

// Custom clean Brand SVG Icons
const GithubIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const menuLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', icon: GithubIcon, href: 'https://github.com/imadhahmed' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/imadhahmed/' },
  { label: 'Facebook', icon: FacebookIcon, href: 'https://web.facebook.com/imadh.ahmed.507/' },
  { label: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/imadh_ahmed/' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Footer() {
  const handleScroll = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="relative pt-32 pb-10 border-t border-white/10 overflow-hidden">
      {/* Giant watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center">
        <span
          className="font-bold uppercase tracking-tighter text-white leading-none whitespace-nowrap"
          style={{ fontSize: '22vw', opacity: 0.03 }}
        >
          IMADH
        </span>
      </div>

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00df8f]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24"
        >
          {/* Left */}
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#00df8f]" />
              <span className="text-xs font-semibold tracking-[0.3em] text-[#00df8f] uppercase">
                Get In Touch
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.9] mb-6"
            >
              Let's Build Something{' '}
              <span style={{ WebkitTextStroke: '2px #00df8f', color: 'transparent' }}>
                Great
              </span>
              <span className="text-[#00df8f]">.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-6 max-w-md text-[1.05rem]">
              I am open to new opportunities, collaborations, and projects in Web Development, AI/ML, and Software Engineering.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-2 text-gray-300 italic text-xs mb-8 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl w-fit">
              <Quote size={12} className="text-[#00df8f] shrink-0" />
              <span>"Strive to build things that make a difference!"</span>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="https://github.com/imadhahmed"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0d1116] font-bold text-sm tracking-wide hover:bg-gray-100 transition-colors duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
            >
              <Code2 size={16} />
              Visit GitHub Profile
              <ArrowUpRight size={16} />
            </motion.a>
          </div>

          {/* Right — Link Grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-12 pt-2">
            {/* Menu */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-6">
                Navigation
              </h3>
              <ul className="flex flex-col gap-4">
                {menuLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleScroll(link.href)}
                      className="text-gray-300 hover:text-[#00df8f] transition-colors duration-300 text-sm font-medium group flex items-center gap-2"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-6">
                Connect
              </h3>
              <ul className="flex flex-col gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-[#00df8f] transition-colors duration-300 text-sm font-medium group flex items-center gap-2"
                      >
                        <Icon size={14} className="text-gray-500 group-hover:text-[#00df8f] transition-colors" />
                        {social.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Days I Code Section */}
        <DaysICodeFooter username="imadhahmed" />

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-300 font-medium tracking-wide">
              Designed and Developed by Imadh Ahmed
            </p>
            <p className="text-[11px] text-gray-500 tracking-wide mt-0.5">
              Copyright © 2026 IA. All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs text-[#00df8f] hover:text-[#00b373] transition-colors tracking-wide font-semibold"
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
