import { apiFetch } from './client'

const BASE = import.meta.env.BASE_URL || '/'
const DEFAULT_CV_PATH = `${BASE.endsWith('/') ? BASE.slice(0, -1) : BASE}/CV.pdf`

export const DEFAULT_SETTINGS = {
  cvUrl: DEFAULT_CV_PATH,
  cvFileName: 'CV.pdf',
}

export async function getSiteSettings() {
  try {
    const res = await apiFetch('/settings')
    if (res && res.data && res.data.cv && res.data.cv.url && res.data.cv.url !== '#') {
      let cvUrl = res.data.cv.url
      if (cvUrl.includes('cloudinary.com') && cvUrl.includes('/upload/') && !cvUrl.includes('fl_attachment')) {
        cvUrl = cvUrl.replace('/upload/', '/upload/fl_attachment/')
      }
      return {
        cvUrl,
        cvFileName: res.data.cv.fileName || DEFAULT_SETTINGS.cvFileName,
      }
    }
    return DEFAULT_SETTINGS
  } catch (error) {
    console.warn('[Settings API] Using fallback settings:', error.message)
    return DEFAULT_SETTINGS
  }
}

