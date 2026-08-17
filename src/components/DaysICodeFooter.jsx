import { motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'

const customTheme = {
  light: ['#161b22', '#0e4429', '#008f5d', '#00c77f', '#00df8f'],
  dark: ['#161b22', '#0e4429', '#008f5d', '#00c77f', '#00df8f'],
}

export default function DaysICodeFooter({ username = 'imadhahmed' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="w-full my-16 text-center"
    >
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-8 bg-[#00df8f]" />
        <span className="text-xs font-semibold tracking-[0.3em] text-[#00df8f] uppercase">
          Activity & Contributions
        </span>
        <div className="h-px w-8 bg-[#00df8f]" />
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter uppercase mb-10 text-white">
        Days I <span className="text-[#00df8f] drop-shadow-[0_0_12px_rgba(0,223,143,0.5)]">Code</span>
      </h2>

      {/* Calendar Glass Container */}
      <div className="max-w-5xl mx-auto glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col items-center justify-center overflow-x-auto relative group">
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00df8f]/5 via-transparent to-[#00df8f]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="w-full overflow-x-auto flex justify-center py-2">
          <GitHubCalendar
            username={username}
            blockSize={14}
            blockMargin={4}
            colorScheme="dark"
            fontSize={14}
            theme={customTheme}
            style={{
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          />
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-white/5 w-full flex items-center justify-between text-xs text-gray-500 font-mono">
          <span>GitHub: @{username}</span>
          <span className="flex items-center gap-1.5 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-[#00df8f] animate-pulse" />
            Live GitHub Commit History
          </span>
        </div>
      </div>
    </motion.div>
  )
}
