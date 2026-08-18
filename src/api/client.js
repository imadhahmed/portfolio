const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000/api'
  }
  return 'https://api.imadh.me/api'
}

const BASE_URL = getBaseUrl()

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
