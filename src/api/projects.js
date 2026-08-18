import { apiFetch } from './client'

export const DEFAULT_PROJECTS = [
  {
    id: 0,
    category: 'Web Development',
    title: 'Portfolio Website',
    description:
      'Personal portfolio website built using React.js, JavaScript, and Bootstrap to showcase projects, skills, and personal experience.',
    tags: ['React.js', 'JavaScript', 'Bootstrap', 'CSS'],
    github: 'https://github.com/imadhahmed/portfolio.git',
    live: 'https://imadhahmed.github.io/',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    color: '#00df8f',
  },
  {
    id: 1,
    category: 'Desktop Application',
    title: 'Personal Organizer',
    description:
      'Personal Organizer application developed using C++ and .NET Framework for productivity management, schedule tracking, and personal task organization.',
    tags: ['C++', '.NET Framework', 'Desktop App'],
    github: 'https://github.com/imadhahmed/personalOrganizer.git',
    live: 'https://github.com/imadhahmed/personalOrganizer.git',
    image:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop',
    color: '#3b82f6',
  },
  {
    id: 2,
    category: 'AI / Computer Vision',
    title: 'Age & Gender Detector',
    description:
      'Computer vision system for real-time age and gender detection using Python and OpenCV with deep neural network classifiers.',
    tags: ['Python', 'OpenCV', 'AI/ML', 'Computer Vision'],
    github: 'https://github.com/imadhahmed/Age----Gender-Detection',
    live: 'https://github.com/imadhahmed/Age----Gender-Detection',
    image:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
    color: '#8b5cf6',
  },
  {
    id: 3,
    category: 'AI / Image Processing',
    title: 'Monitoring Plant Growth',
    description:
      'Automated plant growth monitoring system developed using Python and OpenCV for digital agriculture and image feature processing.',
    tags: ['Python', 'OpenCV', 'Image Processing', 'Automation'],
    github: 'https://github.com/imadhahmed/Monitoring_plant_growth',
    live: 'https://github.com/imadhahmed/Monitoring_plant_growth',
    image:
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop',
    color: '#10b981',
  },
]

export async function getProjects() {
  try {
    const res = await apiFetch('/projects')
    if (res && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map((p, idx) => {
        let rawTags = p.technologies || p.tags || []
        if (typeof rawTags === 'string') {
          try { rawTags = JSON.parse(rawTags) } catch (e) { rawTags = rawTags.split(',').map((t) => t.trim()) }
        }
        const tags = Array.isArray(rawTags) ? rawTags : []
        const imageUrl = typeof p.image === 'string' ? p.image : (p.image?.url || DEFAULT_PROJECTS[0].image)

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
    return DEFAULT_PROJECTS
  } catch (error) {
    console.warn('[Projects API] Using fallback project list:', error.message)
    return DEFAULT_PROJECTS
  }
}
