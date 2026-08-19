import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Quote, Mail, Send, CheckCircle2, User, AtSign, MessageSquare, AlertCircle, PhoneCall } from 'lucide-react'
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
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: '',
  })
  const [result, setResult] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleScroll = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setResult('')

    try {
      const formDataToSend = new FormData(e.target)
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '9e359973-94db-4662-9cf7-64ef3b4aab8f'
      formDataToSend.append('access_key', accessKey)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()
      if (data.success) {
        setResult('Success!')
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: 'Project Inquiry', message: '' })
      } else {
        setResult(data.message || 'Error submitting message.')
      }
    } catch (err) {
      setResult('Error sending message. Please try again later.')
    } finally {
      setSending(false)
    }
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
        {/* Top row - Main Header & Contact Box */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-start"
        >
          {/* Left Column: Heading & Info */}
          <div className="lg:col-span-5">
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

            <motion.div variants={fadeUp} className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-full bg-[#00df8f]/10 border border-[#00df8f]/30 flex items-center justify-center text-[#00df8f] shrink-0">
                  <Mail size={14} />
                </div>
                <a href="mailto:imadhahmed@gmail.com" className="hover:text-[#00df8f] transition-colors">
                  imadhahmed@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-full bg-[#00df8f]/10 border border-[#00df8f]/30 flex items-center justify-center text-[#00df8f] shrink-0">
                  <PhoneCall size={14} />
                </div>
                <a
                  href="https://wa.me/94762293818"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00df8f] transition-colors font-medium"
                >
                  +94 76 229 3818
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Mail Message Box Form */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              className="bg-[#141a21]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.4)] relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#00df8f]/10 border border-[#00df8f]/30 flex items-center justify-center text-[#00df8f]">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Get in Touch</h3>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-8 rounded-2xl bg-[#00df8f]/10 border border-[#00df8f]/30 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00df8f]/20 text-[#00df8f] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-bold text-white text-lg">Message Sent Successfully!</h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out! Your message has been sent directly to Imadh Ahmed.
                  </p>
                  <div className="pt-2 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setResult('')
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#00df8f] text-[#0d1116] font-bold text-xs hover:bg-[#00b373] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1.5">
                        <User size={12} className="text-[#00df8f]" /> Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-[#0d1116] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00df8f] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1.5">
                        <AtSign size={12} className="text-[#00df8f]" /> Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[#0d1116] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00df8f] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare size={12} className="text-[#00df8f]" /> Subject / Topic
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#0d1116] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00df8f] transition-colors"
                    >
                      <option value="Project Inquiry">Project Inquiry / Freelance</option>
                      <option value="Job Opportunity">Job Opportunity / Hiring</option>
                      <option value="AI / ML Collaboration">AI / ML Collaboration</option>
                      <option value="General Message">General Message</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                      Your Message Box
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your email message here..."
                      className="w-full bg-[#0d1116] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00df8f] transition-colors resize-none"
                    />
                  </div>

                  {result && result !== 'Success!' && (
                    <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{result}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#00df8f] text-[#0d1116] font-bold text-sm uppercase tracking-wider hover:bg-[#00b373] transition-all duration-300 shadow-[0_0_20px_rgba(0,223,143,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {sending ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Mail Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Links Row (Navigation & Socials) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-t border-white/10 mb-16">
          <div className="sm:col-span-2">
            <h3 className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">
              Navigation Links
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {menuLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleScroll(link.href)}
                  className="text-gray-300 hover:text-[#00df8f] transition-colors duration-300 text-sm font-medium flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <h3 className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">
              Connect Online
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#00df8f] transition-colors duration-300 text-sm font-medium flex items-center gap-2 group"
                  >
                    <Icon size={14} className="text-gray-500 group-hover:text-[#00df8f] transition-colors" />
                    {social.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

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
