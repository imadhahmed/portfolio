import { adminFetch } from './client'

export async function fetchAllCertificates() {
  return await adminFetch('/certificates/all')
}

export async function createCertificate(formData) {
  return await adminFetch('/certificates', {
    method: 'POST',
    body: formData,
  })
}

export async function updateCertificate(id, formData) {
  return await adminFetch(`/certificates/${id}`, {
    method: 'PUT',
    body: formData,
  })
}

export async function deleteCertificate(id) {
  return await adminFetch(`/certificates/${id}`, {
    method: 'DELETE',
  })
}

export async function reorderCertificates(items) {
  return await adminFetch('/certificates/reorder', {
    method: 'PUT',
    body: JSON.stringify({ items }),
  })
}

