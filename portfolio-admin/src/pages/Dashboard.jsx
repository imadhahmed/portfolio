import { useState, useEffect } from 'react'
import { fetchAllProjects } from '../api/projects'
import { fetchAllCertificates } from '../api/certificates'
import { fetchAllAchievements } from '../api/achievements'
import { fetchSettings } from '../api/settings'
import { FolderKanban, Award, Trophy, FileText, ArrowUpRight } from 'lucide-react'

export default function Dashboard({ setActiveTab }) {
  const [counts, setCounts] = useState({ projects: 0, certificates: 0, achievements: 0, cv: 'Ready' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [p, c, a, s] = await Promise.allSettled([
          fetchAllProjects(),
          fetchAllCertificates(),
          fetchAllAchievements(),
          fetchSettings(),
        ])

        setCounts({
          projects: p.status === 'fulfilled' && p.value?.data ? p.value.data.length : 4,
          certificates: c.status === 'fulfilled' && c.value?.data ? c.value.data.length : 4,
          achievements: a.status === 'fulfilled' && a.value?.data ? a.value.data.length : 0,
          cv: s.status === 'fulfilled' && s.value?.data?.cv?.url ? 'Uploaded' : 'Default',
        })
      } catch (err) {
        console.warn('Dashboard fetch warning:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const cards = [
    { title: 'Projects', count: counts.projects, tab: 'projects', icon: FolderKanban, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Certificates', count: counts.certificates, tab: 'certificates', icon: Award, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Achievements', count: counts.achievements, tab: 'achievements', icon: Trophy, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { title: 'Active CV', count: counts.cv, tab: 'cv', icon: FileText, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Overview Dashboard</h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage all portfolio dynamic sections live</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              onClick={() => setActiveTab(card.tab)}
              className={`p-5 sm:p-6 rounded-2xl border ${card.bg} cursor-pointer hover:scale-[1.02] transition-transform flex items-center justify-between group`}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{card.title}</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{loading ? '...' : card.count}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-white/5 ${card.color} group-hover:bg-white/10 transition-colors`}>
                <Icon size={24} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-[#141a21] border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <h3 className="font-bold text-white text-base">Live Sync Notice</h3>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            Any addition, edit, or removal in the tabs above automatically updates <strong className="text-[#00df8f]">http://imadh.me/</strong> immediately upon visitor refresh.
          </p>
        </div>
        <a
          href="http://imadh.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-[#00df8f] text-[#0b1014] hover:bg-[#00b373] transition-colors shrink-0 self-stretch sm:self-auto justify-center"
        >
          <span>Open imadh.me</span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  )
}
