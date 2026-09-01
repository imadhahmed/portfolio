import { useState, useEffect } from 'react'
import { getCertificates } from '../api/certificates'

const LOCAL_STORAGE_KEY = 'cached_portfolio_certificates'

export function useCertificates() {
  const [certificates, setCertificates] = useState(() => {
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

  const [loading, setLoading] = useState(() => certificates.length === 0)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    getCertificates()
      .then((data) => {
        if (isMounted && data) {
          setCertificates(data)
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
          } catch (e) {
            // Ignore storage write errors
          }
        }
      })
      .catch((err) => {
        if (isMounted && certificates.length === 0) setError(err)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return { certificates, loading, error }
}

