import { apiFetch } from './client'

export const DEFAULT_CERTIFICATES = [
  {
    id: 0,
    category: 'Artificial Intelligence',
    title: 'Machine Learning & Deep Learning Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    description:
      'Comprehensive specialization covering supervised learning algorithms, neural network architectures, computer vision models, NLP, and model deployment.',
    tags: ['Python', 'Deep Learning', 'PyTorch', 'Neural Networks'],
    credentialUrl: 'https://github.com/imadhahmed',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    color: '#00df8f',
  },
  {
    id: 1,
    category: 'Frontend Engineering',
    title: 'Advanced React & Modern Web Development',
    issuer: 'Meta Professional Certification',
    description:
      'Specialized training in modern frontend architectures, component-driven UI development, state management with React, and web performance optimization.',
    tags: ['React.js', 'JavaScript ES6+', 'Web Tech', 'Tailwind CSS'],
    credentialUrl: 'https://github.com/imadhahmed',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    color: '#3b82f6',
  },
  {
    id: 2,
    category: 'Academic Achievement',
    title: 'BSc Information Technology Scholar',
    issuer: 'Rajarata University of Sri Lanka',
    description:
      'Recognized for academic excellence, core software engineering coursework, data structures, and innovative intelligent automation projects.',
    tags: ['Information Technology', 'Software Engineering', 'RUSL'],
    credentialUrl: 'https://github.com/imadhahmed',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    color: '#8b5cf6',
  },
  {
    id: 3,
    category: 'Computer Vision',
    title: 'OpenCV & Digital Image Processing',
    issuer: 'OpenCV University',
    description:
      'Hands-on certification in feature extraction, real-time video processing, facial detection neural networks, and automated plant growth tracking systems.',
    tags: ['OpenCV', 'Python', 'Computer Vision', 'Image Processing'],
    credentialUrl: 'https://github.com/imadhahmed',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    color: '#10b981',
  },
]

export async function getCertificates() {
  try {
    const [certRes, achRes] = await Promise.allSettled([
      apiFetch('/certificates'),
      apiFetch('/achievements'),
    ])

    const certData = certRes.status === 'fulfilled' && certRes.value?.data ? certRes.value.data : []
    const achData = achRes.status === 'fulfilled' && achRes.value?.data ? achRes.value.data : []

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

    if (combined.length > 0) {
      return combined.map((c, idx) => {
        let rawTags = c.tags || [c.issuer || c.organization].filter(Boolean)
        if (typeof rawTags === 'string') {
          try { rawTags = JSON.parse(rawTags) } catch (e) { rawTags = rawTags.split(',').map((t) => t.trim()) }
        }
        const tags = Array.isArray(rawTags) ? rawTags : []
        const imageUrl = typeof c.image === 'string' ? c.image : (c.image?.url || DEFAULT_CERTIFICATES[0].image)

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
    }
    return DEFAULT_CERTIFICATES
  } catch (error) {
    console.warn('[Certificates & Achievements API] Using fallback list:', error.message)
    return DEFAULT_CERTIFICATES
  }
}
