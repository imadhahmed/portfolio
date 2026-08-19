import { adminFetch } from './client'

export async function fetchAllProjects() {
  return await adminFetch('/projects/all')
}

export async function createProject(formData) {
  return await adminFetch('/projects', {
    method: 'POST',
    body: formData,
  })
}

export async function updateProject(id, formData) {
  return await adminFetch(`/projects/${id}`, {
    method: 'PUT',
    body: formData,
  })
}

export async function deleteProject(id) {
  return await adminFetch(`/projects/${id}`, {
    method: 'DELETE',
  })
}
