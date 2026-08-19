import { apiFetch } from './client'

export const DEFAULT_SETTINGS = {
  cvUrl: '/CV.pdf',
  cvFileName: 'CV.pdf',
}

export function formatCvUrl(url) {
  if (!url || url === '#') return '/CV.pdf'
  if (url.includes('cloudinary.com') && url.includes('/upload/') && !url.includes('fl_attachment')) {
    return url.replace('/upload/', '/upload/fl_attachment/')
  }
  return url
}

export function getCvLinkProps(cvUrl, fileName = 'CV.pdf') {
  const url = formatCvUrl(cvUrl)
  const isExternal = url.startsWith('http://') || url.startsWith('https://')

  if (isExternal) {
    return {
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer',
    }
  }

  return {
    href: url,
    download: fileName,
    target: '_blank',
    rel: 'noopener noreferrer',
  }
}

export async function getSiteSettings() {
  try {
    const res = await apiFetch('/settings')
    if (res && res.data && res.data.cv && res.data.cv.url && res.data.cv.url !== '#') {
      return {
        cvUrl: formatCvUrl(res.data.cv.url),
        cvFileName: res.data.cv.fileName || DEFAULT_SETTINGS.cvFileName,
      }
    }
    return DEFAULT_SETTINGS
  } catch (error) {
    console.warn('[Settings API] Using fallback settings:', error.message)
    return DEFAULT_SETTINGS
  }
}
