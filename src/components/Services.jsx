import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const capabilities = [
  {
    number: '01',
    title: 'CUSTOM SOFTWARE DEVELOPMENT',
    description:
      'Tailored end-to-end software solutions designed to solve unique business challenges, optimize operations, and scale with high performance, security, and maintainable architecture.',
  },
  {
    number: '02',
    title: 'WEB APPLICATION DEVELOPMENT',
    description:
      'Building scalable, high-performance web applications using modern JavaScript frameworks (React.js, Node.js) with fluid responsive UX and robust backend systems.',
  },
  {
    number: '03',
    title: 'MOBILE APPLICATION DEVELOPMENT',
    description:
      'Designing and engineering mobile applications tailored for iOS and Android platforms with focus on user-centric UI, fast performance, and intuitive navigation.',
  },
  {
    number: '04',
    title: 'DESKTOP SOFTWARE SOLUTIONS',
    description:
      'Developing reliable, native desktop software applications leveraging C++ and modern GUI frameworks optimized for raw execution speed, security, and system efficiency.',
  },
  {
    number: '05',
    title: 'AI INTEGRATION & INTELLIGENT AUTOMATION',
    description:
      'Embedding Machine Learning models, Deep Learning, NLP pipelines, and Computer Vision solutions to automate complex workflows and deliver data-driven intelligence.',
  },
  {
    number: '06',
    title: 'CLOUD MIGRATION & CLOUD-NATIVE SOLUTIONS',
    description:
      'Architecting, containerizing, and deploying cloud-native applications using Docker and cloud infrastructure to ensure elasticity, high availability, and seamless deployment.',
  },
  {
    number: '07',
    title: 'LEGACY SYSTEM MODERNIZATION',
    description:
      'Refactoring and upgrading outdated legacy codebase architectures into modern, secure, and modular tech stacks without disrupting live business operations.',
  },
  {
    number: '08',
    title: 'API DEVELOPMENT & SYSTEM INTEGRATION',
    description:
      'Designing secure RESTful and GraphQL APIs to seamlessly connect disparate software platforms, third-party services, and automated data processing pipelines.',
  },
  {
    number: '09',
    title: 'SOFTWARE MAINTENANCE & TECHNICAL SUPPORT',
    description:
      'Providing ongoing software optimization, security patches, performance monitoring, and continuous technical support to maintain maximum system reliability and performance.',
  },
]

export default function Services() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section id="services" className="py-32 relative">
      {/* Glow */}
      <div className="absolute inset-x-0 top-1/3 h-[300px] bg-[#00df8f]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#00df8f]" />
            <span className="text-xs font-semibold tracking-[0.3em] text-[#00df8f] uppercase">
              Services
            </span>
            <div className="h-px w-8 bg-[#00df8f]" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.9]">
            Technical Services &{' '}
            <span style={{ WebkitTextStroke: '2px #00df8f', color: 'transparent' }}>
              Solutions
            </span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto divide-y divide-white/10">
          {capabilities.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-6 py-7 text-left group"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span className="text-xs font-bold tracking-widest text-[#00df8f] font-mono w-8 flex-shrink-0">
                    {item.number}
                  </span>

                  {/* Title */}
                  <span
                    className={`flex-1 text-xl sm:text-2xl font-bold tracking-tighter uppercase transition-colors duration-300 ${
                      isOpen ? 'text-[#00df8f]' : 'text-white group-hover:text-gray-200'
                    }`}
                  >
                    {item.title}
                  </span>

                  {/* Toggle icon */}
                  <motion.div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'border-[#00df8f] bg-[#00df8f]/10 text-[#00df8f]'
                        : 'border-white/20 text-gray-400 group-hover:border-white/40'
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isOpen ? (
                        <motion.span
                          key="minus"
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Minus size={16} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="plus"
                          initial={{ opacity: 0, rotate: 90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: -90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Plus size={16} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-14 pr-16">
                        <p className="text-gray-400 leading-relaxed text-[1.05rem]">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
