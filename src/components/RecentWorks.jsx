import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Code2 } from 'lucide-react'

// Custom clean Github SVG Icon
const GithubIcon = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const projects = [
  {
    id: 0,
    category: 'Web Development',
    title: 'Portfolio Website',
    description:
      'Personal portfolio website built using React.js, JavaScript, and Bootstrap to showcase projects, skills, and personal experience.',
    tags: ['React.js', 'JavaScript', 'Bootstrap', 'CSS'],
    github: 'https://github.com/imadhahmed/portfolio.git',
    live: 'https://imadhahmed.github.io/',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    color: '#00df8f',
  },
  {
    id: 1,
    category: 'Desktop Application',
    title: 'Personal Organizer',
    description:
      'Personal Organizer application developed using C++ and .NET Framework for productivity management, schedule tracking, and personal task organization.',
    tags: ['C++', '.NET Framework', 'Desktop App'],
    github: 'https://github.com/imadhahmed/personalOrganizer.git',
    live: 'https://github.com/imadhahmed/personalOrganizer.git',
    image:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop',
    color: '#3b82f6',
  },
  {
    id: 2,
    category: 'AI / Computer Vision',
    title: 'Age & Gender Detector',
    description:
      'Computer vision system for real-time age and gender detection using Python and OpenCV with deep neural network classifiers.',
    tags: ['Python', 'OpenCV', 'AI/ML', 'Computer Vision'],
    github: 'https://github.com/imadhahmed/Age----Gender-Detection',
    live: 'https://github.com/imadhahmed/Age----Gender-Detection',
    image:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
    color: '#8b5cf6',
  },
  {
    id: 3,
    category: 'AI / Image Processing',
    title: 'Monitoring Plant Growth',
    description:
      'Automated plant growth monitoring system developed using Python and OpenCV for digital agriculture and image feature processing.',
    tags: ['Python', 'OpenCV', 'Image Processing', 'Automation'],
    github: 'https://github.com/imadhahmed/Monitoring_plant_growth',
    live: 'https://github.com/imadhahmed/Monitoring_plant_growth',
    image:
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop',
    color: '#10b981',
  },
]

const springConfig = { ease: [0.32, 0.72, 0, 1], duration: 0.6 }

export default function RecentWorks() {
  const [activeIdx, setActiveIdx] = useState(0)

  const getCardProps = (i) => {
    const total = projects.length
    // diff: 0 = front, positive = behind
    let diff = (i - activeIdx + total) % total
    return { diff }
  }

  const handleCardClick = (i) => {
    if (i === activeIdx) {
      // cycle front card to the back
      setActiveIdx((prev) => (prev + 1) % projects.length)
    } else {
      // pull clicked card to front
      setActiveIdx(i)
    }
  }

  const activeProject = projects[activeIdx]

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00df8f]/4 blur-[120px] pointer-events-none" />

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
                Projects
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.9]">
              Featured{' '}
              <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>
                Works
              </span>
            </h2>
          </motion.div>

          <motion.a
            href="https://github.com/imadhahmed"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.04, x: 4 }}
            className="flex items-center gap-2 text-sm font-semibold text-[#00df8f] border border-[#00df8f]/30 rounded-full px-6 py-3 hover:bg-[#00df8f]/10 transition-colors duration-300 self-start sm:self-auto"
          >
            View GitHub Profile
            <ArrowUpRight size={16} />
          </motion.a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — Card Stack */}
          <div className="lg:col-span-7">
            {/* Stack container */}
            <div
              className="relative h-[340px] sm:h-[450px] md:h-[480px]"
              style={{ perspective: '1000px' }}
            >
              {projects.map((project, i) => {
                const { diff } = getCardProps(i)
                const isActive = diff === 0
                const zIndex = projects.length - diff

                return (
                  <motion.div
                    key={project.id}
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
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Active badge */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#00df8f] text-[#0d1116]"
                      >
                        Active
                      </motion.div>
                    )}
                    {/* Click hint for inactive */}
                    {!isActive && diff <= 2 && (
                      <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
                    )}
                    {/* Category on bottom of active */}
                    {isActive && (
                      <div className="absolute bottom-4 left-4">
                        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/80 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center gap-3 mt-8">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIdx
                      ? 'w-8 h-2 bg-[#00df8f] shadow-[0_0_8px_rgba(0,223,143,0.6)]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
              <span className="ml-auto text-xs text-gray-600 font-mono">
                {String(activeIdx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right — Description Panel */}
          <div className="lg:col-span-5 lg:pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Category */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: activeProject.color }}
                  />
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#00df8f]">
                    {activeProject.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white leading-tight mb-5">
                  {activeProject.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-8 text-[1.02rem]">
                  {activeProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border border-white/10 text-gray-300 bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/20 bg-white/5 hover:border-[#00df8f] hover:text-[#00df8f] transition-all"
                  >
                    <GithubIcon size={15} />
                    <span>Source Code</span>
                  </motion.a>

                  <motion.a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#0d1116] bg-[#00df8f] hover:bg-[#00b373] transition-colors shadow-[0_0_15px_rgba(0,223,143,0.3)]"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                  </motion.a>
                </div>

                {/* Separator line */}
                <div className="mt-10 h-px bg-gradient-to-r from-white/10 to-transparent" />

                {/* Hint text */}
                <p className="mt-6 text-xs text-gray-600 tracking-wide">
                  Click card stack to cycle projects
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
