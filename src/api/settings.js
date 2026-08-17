import { apiFetch } from './client'

export const DEFAULT_SETTINGS = {
  cvUrl: '/CV.pdf',
  cvFileName: 'Imadh_Ahmed_CV.pdf',
}

export async function getSiteSettings() {
  try {
    const res = await apiFetch('/settings')
    if (res && res.data && res.data.cv && res.data.cv.url) {
      return {
        cvUrl: res.data.cv.url,
        cvFileName: res.data.cv.fileName || DEFAULT_SETTINGS.cvFileName,
      }
    }
    return DEFAULT_SETTINGS
  } catch (error) {
    console.warn('[Settings API] Using fallback settings:', error.message)
    return DEFAULT_SETTINGS
  }
}
