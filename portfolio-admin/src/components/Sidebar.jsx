import { FolderKanban, Award, Trophy, FileText, LayoutDashboard, LogOut } from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'cv', label: 'CV Management', icon: FileText },
  ]

  return (
    <aside className="w-64 bg-[#0f151b] border-r border-gray-800/80 flex flex-col justify-between min-h-screen">
      <div>
        <div className="p-6 border-b border-gray-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00df8f] flex items-center justify-center font-bold text-[#0b1014] text-lg">
            IA
          </div>
          <div>
            <h1 className="font-bold text-sm text-white tracking-wide">Imadh Admin</h1>
            <p className="text-[11px] text-gray-500 font-mono">Portfolio CMS</p>
          </div>
        </div>

        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#00df8f]/10 text-[#00df8f] border border-[#00df8f]/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800/80">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
