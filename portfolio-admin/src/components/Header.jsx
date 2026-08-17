import { Globe, User } from 'lucide-react'

export default function Header({ user }) {
  return (
    <header className="h-16 bg-[#0f151b]/90 border-b border-gray-800/80 px-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <a
          href="http://imadh.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-semibold text-[#00df8f] bg-[#00df8f]/10 border border-[#00df8f]/20 px-3.5 py-1.5 rounded-full hover:bg-[#00df8f]/20 transition-all"
        >
          <Globe size={14} />
          <span>Live Site: imadh.me</span>
        </a>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300">
          <User size={16} />
        </div>
        <div className="text-right text-xs">
          <p className="font-semibold text-white">{user?.email || 'admin@imadh.me'}</p>
          <p className="text-gray-500 text-[10px] uppercase font-mono">Administrator</p>
        </div>
      </div>
    </header>
  )
}
