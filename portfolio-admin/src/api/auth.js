import { adminFetch } from './client'

export async function login(email, password) {
  const data = await adminFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  if (data.token) {
    localStorage.setItem('admin_token', data.token)
  }
  return data
}

export async function getMe() {
  return await adminFetch('/auth/me')
}

export function logout() {
  localStorage.removeItem('admin_token')
}
