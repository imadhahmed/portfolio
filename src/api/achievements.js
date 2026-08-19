import { apiFetch } from './client'

export async function getAchievements() {
  try {
    const res = await apiFetch('/achievements')
    if (res && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map((a, idx) => ({
        id: a._id || a.id || idx,
        category: a.category || 'Achievement',
        title: a.title || 'Untitled Achievement',
        organization: a.organization || 'Awarding Body',
        issuer: a.organization || 'Awarding Body',
        description: a.description || '',
        date: a.date || '',
        credentialUrl: a.credentialUrl || '#',
        image: typeof a.image === 'string' ? a.image : (a.image?.url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'),
        color: a.color || '#8b5cf6',
      }))
    }
    return []
  } catch (error) {
    console.warn('[Achievements API] Warning fetching achievements:', error.message)
    return []
  }
}
