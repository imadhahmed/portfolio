import { Globe, User, Menu } from 'lucide-react'

export default function Header({ user, onToggleMobileMenu }) {
  return (
    <header className="h-16 bg-[#0f151b]/90 border-b border-gray-800/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 md:hidden transition-colors"
          aria-label="Open Sidebar Menu"
        >
          <Menu size={22} />
        </button>

        <a
          href="http://imadh.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-semibold text-[#00df8f] bg-[#00df8f]/10 border border-[#00df8f]/20 px-3 sm:px-3.5 py-1.5 rounded-full hover:bg-[#00df8f]/20 transition-all"
        >
          <Globe size={14} className="shrink-0" />
          <span className="hidden sm:inline">Live Site: imadh.me</span>
          <span className="sm:hidden">imadh.me</span>
        </a>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 shrink-0">
          <User size={16} />
        </div>
        <div className="text-right text-xs">
          <p className="font-semibold text-white truncate max-w-[120px] sm:max-w-none">{user?.email || 'admin@imadh.me'}</p>
          <p className="text-gray-500 text-[10px] uppercase font-mono hidden xs:block">Administrator</p>
        </div>
      </div>
    </header>
  )
}
