import { apiFetch } from './client'

export const DEFAULT_PROJECTS = []

export async function getProjects() {
  try {
    const res = await apiFetch('/projects')
    if (res && Array.isArray(res.data)) {
      return res.data.map((p, idx) => {
        let rawTags = p.technologies || p.tags || []
        if (typeof rawTags === 'string') {
          try { rawTags = JSON.parse(rawTags) } catch (e) { rawTags = rawTags.split(',').map((t) => t.trim()) }
        }
        const tags = Array.isArray(rawTags) ? rawTags : []
        const imageUrl = typeof p.image === 'string' ? p.image : (p.image?.url || '')

        return {
          id: p._id || p.id || idx,
          category: p.category || 'Web Development',
          title: p.title || 'Untitled Project',
          description: p.description || '',
          tags,
          github: p.githubUrl || p.github || '#',
          live: p.liveUrl || p.live || '#',
          image: imageUrl,
          color: p.color || '#00df8f',
        }
      })
    }
    return []
  } catch (error) {
    console.warn('[Projects API] Failed to fetch projects from database:', error.message)
    return []
  }
}
