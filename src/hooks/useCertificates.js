import { useState, useEffect } from 'react'
import { getCertificates, DEFAULT_CERTIFICATES } from '../api/certificates'

export function useCertificates() {
  const [certificates, setCertificates] = useState(DEFAULT_CERTIFICATES)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    getCertificates()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setCertificates(data)
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

  return { certificates, loading, error }
}
