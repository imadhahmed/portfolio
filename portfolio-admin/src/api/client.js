const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function adminFetch(endpoint, options = {}) {
  const token = localStorage.getItem('admin_token')
  const url = `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`

  const headers = {
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    localStorage.removeItem('admin_token')
    window.dispatchEvent(new Event('auth:unauthorized'))
  }

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`)
  }
  return data
}
