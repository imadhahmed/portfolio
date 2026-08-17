import { useState, useEffect } from 'react'
import { getProjects, DEFAULT_PROJECTS } from '../api/projects'

export function useProjects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    getProjects()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setProjects(data)
        }
      })
      .catch((err) => {
        if (isMounted) setError(err)
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
