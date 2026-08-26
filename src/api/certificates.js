import { apiFetch } from './client'

export const DEFAULT_CERTIFICATES = []

export async function getCertificates() {
  try {
    const [certRes, achRes] = await Promise.allSettled([
      apiFetch('/certificates'),
      apiFetch('/achievements'),
    ])

    const certData = certRes.status === 'fulfilled' && certRes.value?.data && Array.isArray(certRes.value.data) ? certRes.value.data : []
    const achData = achRes.status === 'fulfilled' && achRes.value?.data && Array.isArray(achRes.value.data) ? achRes.value.data : []

    const combined = [
      ...certData.map((c) => ({ ...c, _isCert: true })),
      ...achData.map((a) => ({
        ...a,
        issuer: a.organization || a.issuer || 'Award & Honor',
        category: a.category || 'Achievement',
        tags: a.tags || [a.organization || 'Honor'].filter(Boolean),
        _isAch: true,
      })),
    ]

    return combined.map((c, idx) => {
      let rawTags = c.tags || [c.issuer || c.organization].filter(Boolean)
      if (typeof rawTags === 'string') {
        try { rawTags = JSON.parse(rawTags) } catch (e) { rawTags = rawTags.split(',').map((t) => t.trim()) }
      }
      const tags = Array.isArray(rawTags) ? rawTags : []
      const imageUrl = typeof c.image === 'string' ? c.image : (c.image?.url || '')

      return {
        id: c._id || c.id || idx,
        category: c.category || (c._isAch ? 'Achievement' : 'Certification'),
        title: c.title || 'Untitled Certificate',
        issuer: c.issuer || c.organization || 'Verification Authority',
        description: c.description || '',
        tags,
        credentialUrl: c.credentialUrl || c.credential_url || '#',
        image: imageUrl,
        color: c.color || (c._isAch ? '#8b5cf6' : '#00df8f'),
      }
    })
  } catch (error) {
    console.warn('[Certificates & Achievements API] Failed to fetch certificates from database:', error.message)
    return []
  }
}
