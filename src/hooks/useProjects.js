import { useState, useEffect } from 'react'
import { getProjects } from '../api/projects'

const LOCAL_STORAGE_KEY = 'cached_portfolio_projects'

export function useProjects() {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      // Ignore storage read errors
    }
    return []
  })

  const [loading, setLoading] = useState(() => projects.length === 0)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    getProjects()
      .then((data) => {
        if (isMounted && data) {
          setProjects(data)
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
          } catch (e) {
            // Ignore storage write errors
          }
        }
      })
      .catch((err) => {
        if (isMounted && projects.length === 0) setError(err)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return { projects, loading, error }
}

