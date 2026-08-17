import { adminFetch } from './client'

export async function fetchSettings() {
  return await adminFetch('/settings')
}

export async function uploadCV(file) {
  const formData = new FormData()
  formData.append('cv', file)
  return await adminFetch('/settings/cv', {
    method: 'POST',
    body: formData,
  })
}
