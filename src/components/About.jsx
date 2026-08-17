import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Briefcase, Cpu, Code2 } from 'lucide-react'

const skills = [

  'Machine Learning',
  'Deep Learning',
  'NLP',
  'Langchain',
  'RAG',
  'Pytorch',
  'Docker',
  'Python',
  'JavaScript',
  'React.js',
  'Java',
  'OpenCV',
  'Flutter',
  'C++',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      {/* Side glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-[#00df8f]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Label */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#00df8f]" />
              <span className="text-xs font-semibold tracking-[0.3em] text-[#00df8f] uppercase">
                About Me
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.9] uppercase mb-8"
            >
              Innovating With{' '}
              <span
                style={{ WebkitTextStroke: '2px #00df8f', color: 'transparent' }}
              >
                Passion
              </span>
              <span className="text-[#00df8f]">.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-5 text-[1.05rem]">
              I am a <strong className="text-white">BSc Information Technology undergraduate at Rajarata University of Sri Lanka</strong>, with a strong passion for <strong className="text-[#00df8f]">Artificial Intelligence and Machine Learning</strong>. I am deeply driven by the challenge of developing intelligent systems that solve real-world problems through data-driven insights and automation.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-8 text-[1.05rem]">
              Known for my commitment to excellence and continuous learning, I actively seek opportunities to apply my knowledge in practical, impactful ways. My goal is to contribute meaningfully to the advancement of AI and make a lasting difference in the tech industry.
            </motion.p>

            {/* Quick Details Cards */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Briefcase size={20} className="text-[#00df8f] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Primary Focus</p>
                  <p className="text-sm font-semibold text-white mt-0.5">AI/ML & Web Tech</p>
                  <p className="text-xs text-gray-400">Modern Software Dev</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <GraduationCap size={20} className="text-[#00df8f] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Education</p>
                  <p className="text-sm font-semibold text-white mt-0.5">BSc in IT (Pursuing)</p>
                  <p className="text-xs text-gray-400">Rajarata Uni of Sri Lanka</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Technical Skills & Tools */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass rounded-3xl p-8">
              {/* Card header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Cpu size={18} className="text-[#00df8f]" />
                  <h3 className="text-sm font-bold tracking-[0.2em] text-gray-200 uppercase">
                    Technical Skills & Tools
                  </h3>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00df8f]/60" />
                </div>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 border border-white/10 bg-white/5 cursor-default transition-all duration-300 hover:border-[#00df8f] hover:text-[#00df8f] hover:shadow-[0_0_15px_rgba(0,223,143,0.3)] hover:bg-[#00df8f]/5"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Fields of Interest */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
                  <Code2 size={14} className="text-[#00df8f]" />
                  <span>Fields of Interest</span>
                </div>
                <ul className="text-xs text-gray-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00df8f]" />
                    <span>Web Technologies (React.js, Node.js, Frontend & Backend)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00df8f]" />
                    <span>AI & Computer Vision Systems (Python, OpenCV)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00df8f]" />
                    <span>Android Application Development</span>
                  </li>
                </ul>
              </div>

              {/* Bottom bar */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#00df8f]" />
                  <span className="text-xs text-gray-400">Eravur, Batticaloa, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00df8f] animate-pulse" />
                  <span className="text-xs text-[#00df8f]">Ready to Collaborate</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
