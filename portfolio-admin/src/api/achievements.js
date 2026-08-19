import { adminFetch } from './client'

export async function fetchAllAchievements() {
  return await adminFetch('/achievements/all')
}

export async function createAchievement(formData) {
  return await adminFetch('/achievements', {
    method: 'POST',
    body: formData,
  })
}

export async function updateAchievement(id, formData) {
  return await adminFetch(`/achievements/${id}`, {
    method: 'PUT',
    body: formData,
  })
}

export async function deleteAchievement(id) {
  return await adminFetch(`/achievements/${id}`, {
    method: 'DELETE',
  })
}
