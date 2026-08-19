import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { useCertificates } from '../hooks/useCertificates'

const springConfig = { ease: [0.32, 0.72, 0, 1], duration: 0.6 }

export default function Certificates() {
  const { certificates } = useCertificates()
  const [activeIdx, setActiveIdx] = useState(0)

  const safeIdx = activeIdx >= certificates.length ? 0 : activeIdx

  const getCardProps = (i) => {
    const total = certificates.length || 1
    let diff = (i - safeIdx + total) % total
    return { diff }
  }

  const handleCardClick = (i) => {
    if (i === safeIdx) {
      setActiveIdx((prev) => (prev + 1) % (certificates.length || 1))
    } else {
      setActiveIdx(i)
    }
  }

  const activeCert = certificates[safeIdx] || certificates[0]

  return (
    <section id="certificates" className="py-32 relative overflow-hidden bg-[#0d1116]/80">
      {/* Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00df8f]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#00df8f]" />
              <span className="text-xs font-semibold tracking-[0.3em] text-[#00df8f] uppercase">
                Credentials & Honors
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.9]">
              Certificates &{' '}
              <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>
                Achievements
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — 3D Stacked Card Deck */}
          <div className="lg:col-span-7">
            <div
              className="relative h-[340px] sm:h-[450px] md:h-[480px]"
              style={{ perspective: '1000px' }}
            >
              {certificates.map((cert, i) => {
                const { diff } = getCardProps(i)
                const isActive = diff === 0
                const zIndex = certificates.length - diff

                return (
                  <motion.div
                    key={cert.id}
                    onClick={() => handleCardClick(i)}
                    animate={{
                      y: diff * 35,
                      scale: 1 - diff * 0.05,
                      rotateX: diff * 2,
                      zIndex,
                      opacity: diff > 2 ? 0 : 1,
                    }}
                    transition={springConfig}
                    className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-white/10"
                    style={{
                      transformOrigin: 'center top',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    {/* Active badge */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#00df8f] text-[#0d1116]"
                      >
                        <ShieldCheck size={14} />
                        Verified
                      </motion.div>
                    )}

                    {/* Click hint for inactive */}
                    {!isActive && diff <= 2 && (
                      <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
                    )}

                    {/* Category on bottom of active */}
                    {isActive && (
                      <div className="absolute bottom-4 left-4">
                        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90 bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                          {cert.category}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center gap-3 mt-8">
              {certificates.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIdx
                      ? 'w-8 h-2 bg-[#00df8f] shadow-[0_0_8px_rgba(0,223,143,0.6)]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to certificate ${i + 1}`}
                />
              ))}
              <span className="ml-auto text-xs text-gray-600 font-mono">
                {String(activeIdx + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right — Description Panel */}
          <div className="lg:col-span-5 lg:pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Category & Issuer */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: activeCert.color }}
                    />
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#00df8f]">
                      {activeCert.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-3">
                  Issued by: <span className="text-white font-semibold">{activeCert.issuer}</span>
                </p>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white leading-tight mb-5">
                  {activeCert.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-8 text-[1.02rem]">
                  {activeCert.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {activeCert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border border-white/10 text-gray-300 bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <motion.a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0d1116] bg-[#00df8f] hover:bg-[#00b373] transition-colors shadow-[0_0_18px_rgba(0,223,143,0.35)]"
                >
                  <ExternalLink size={15} />
                  <span>Verify Credential</span>
                </motion.a>

                {/* Separator line */}
                <div className="mt-10 h-px bg-gradient-to-r from-white/10 to-transparent" />

                {/* Hint text */}
                <p className="mt-6 text-xs text-gray-600 tracking-wide">
                  Click certificate stack to cycle achievements
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
