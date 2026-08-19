import { useState, useEffect } from 'react'
import { getSiteSettings, DEFAULT_SETTINGS } from '../api/settings'

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    getSiteSettings()
      .then((data) => {
        if (isMounted && data) {
          setSettings(data)
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  return { settings, loading }
}
