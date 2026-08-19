import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Briefcase, GraduationCap, Quote, Download } from 'lucide-react'
import { useSettings } from '../hooks/useSettings'
import { getCvLinkProps } from '../api/settings'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  const { settings } = useSettings()
  const cvProps = getCvLinkProps(settings.cvUrl, settings.cvFileName)
  const constraintsRef = useRef(null)

  const handleScroll = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0d1116] grid-bg">
      {/* Decorative radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#00df8f]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00df8f]/3 blur-[100px]" />
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-bold uppercase leading-none text-white"
          style={{ fontSize: '18vw', opacity: 0.02, letterSpacing: '-0.05em' }}
        >
          IMADH
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-96px)]">

          {/* Left — Text Content */}
          <motion.div
            className="flex flex-col justify-center"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* Subheading */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00df8f] shadow-[0_0_8px_rgba(0,223,143,0.8)]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#00df8f] uppercase">
                AI/ML Enthusiast | IT Undergraduate
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              className="font-bold uppercase leading-[0.88] tracking-tighter mb-6"
            >
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
                IMADH
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                <span
                  className="inline-block"
                  style={{
                    WebkitTextStroke: '2px #00df8f',
                    color: 'transparent',
                  }}
                >
                  AHMED
                </span>
                <span className="text-[#00df8f]">.</span>
              </span>
            </motion.h1>

            {/* Quote Badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6 text-gray-300 italic text-sm bg-white/5 border border-white/10 px-4 py-2 rounded-2xl w-fit">
              <Quote size={14} className="text-[#00df8f] shrink-0" />
              <span>"Strive to build things that make a difference!"</span>
            </motion.div>

            {/* Body */}
            <motion.p
              variants={fadeUp}
              className="text-gray-400 leading-relaxed text-base sm:text-lg max-w-lg mb-8"
            >
              I fell in love with programming and constantly strive to learn and innovate. Fluent in core programming concepts, web development, and AI technologies.
            </motion.p>

            {/* Location & Education badging */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10 text-xs text-gray-400">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <MapPin size={13} className="text-[#00df8f]" />
                <span>Eravur, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <GraduationCap size={13} className="text-[#00df8f]" />
                <span>BSc IT @ Rajarata Uni</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll('#work')}
                className="flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-sm tracking-wide text-[#0d1116] bg-gradient-to-r from-[#00df8f] to-[#00b373] shadow-[0_4px_24px_rgba(0,223,143,0.35)] hover:shadow-[0_4px_32px_rgba(0,223,143,0.55)] transition-shadow duration-300"
              >
                View Projects
                <span className="w-7 h-7 rounded-full bg-[#0d1116]/20 flex items-center justify-center">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </motion.button>

              <motion.a
                {...cvProps}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-sm tracking-wide text-white border border-white/20 bg-white/5 hover:border-[#00df8f] hover:text-[#00df8f] transition-all duration-300"
              >
                <Download size={16} />
                Download CV
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll('#contact')}
                className="flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-sm tracking-wide text-white border border-white/20 bg-white/5 hover:border-white/40 transition-colors duration-300"
              >
                Contact Me
                <span className="w-2 h-2 rounded-full bg-[#00df8f]" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — Draggable ID Card */}
          <div className="flex justify-center items-center relative" ref={constraintsRef}>
            {/* Lanyard */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full z-10 pointer-events-none">
              <div
                className="w-[3px] bg-gradient-to-b from-transparent via-[#00df8f]/40 to-[#00df8f]/70"
                style={{ height: '160px' }}
              />
            </div>

            <motion.div
              drag
              dragElastic={0.2}
              dragConstraints={constraintsRef}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              animate={{
                y: [0, -15, 0],
                rotateZ: [-1, 1, -1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ cursor: 'grab' }}
              whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
              className="relative w-[250px] sm:w-[290px] rounded-3xl bg-[#14181f] border border-white/10 shadow-2xl overflow-hidden select-none z-20"
            >
              {/* Inner border highlight */}
              <div className="absolute inset-[1px] rounded-3xl border border-white/5 pointer-events-none z-10" />

              {/* Card top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-[#00df8f] to-[#00b373]" />

              {/* Lanyard attachment */}
              <div className="flex justify-center pt-5 pb-2">
                <div className="w-10 h-1.5 rounded-full bg-white/10" />
              </div>

              {/* Badge label */}
              <div className="text-center pb-2">
                <span className="text-[10px] font-bold tracking-[0.25em] text-gray-500 uppercase">
                  Imadh Ahmed
                </span>
              </div>

              {/* Portrait */}
              <div className="relative mx-6 rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="https://res.cloudinary.com/r6datmty/image/upload/v1787116009/my.jpg"
                  alt="Imadh Ahmed portrait"
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14181f] via-transparent to-transparent" />
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-bold text-lg tracking-tight text-white">
                    Imadh Ahmed<span className="text-[#00df8f]">.</span>
                  </p>
                  <p className="text-xs text-[#00df8f] tracking-wide font-medium">AI/ML Enthusiast</p>
                  <p className="text-[11px] text-gray-400">BSc in IT @ RUSL</p>
                </div>
              </div>

              {/* Card bottom info */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00df8f] animate-pulse" />
                  <span className="text-xs text-gray-300">Open to Opportunities</span>
                </div>
                <div className="text-xs text-gray-500 font-mono">2026</div>
              </div>
            </motion.div>

            {/* Drag hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 tracking-widest uppercase whitespace-nowrap"
            >
              ↑ drag me
            </motion.p>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] text-gray-600 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#00df8f]/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
