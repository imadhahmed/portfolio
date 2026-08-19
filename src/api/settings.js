import { apiFetch } from './client'

export const DEFAULT_SETTINGS = {
  cvUrl: '/CV.pdf',
  cvFileName: 'CV.pdf',
}

export async function getSiteSettings() {
  try {
    const res = await apiFetch('/settings')
    if (res && res.data && res.data.cv && res.data.cv.url && res.data.cv.url !== '#') {
      let url = res.data.cv.url
      if (url.includes('cloudinary.com') && url.includes('/upload/') && !url.includes('fl_attachment')) {
        url = url.replace('/upload/', '/upload/fl_attachment/')
      }
      return {
        cvUrl: url,
        cvFileName: res.data.cv.fileName || DEFAULT_SETTINGS.cvFileName,
      }
    }
    return DEFAULT_SETTINGS
  } catch (error) {
    console.warn('[Settings API] Using fallback settings:', error.message)
    return DEFAULT_SETTINGS
  }
}

