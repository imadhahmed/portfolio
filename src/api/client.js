const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.imadh.me/api'

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.warn(`[API Client Warning] Failed to fetch ${url}:`, error.message)
    throw error
  }
}
