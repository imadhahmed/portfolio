import { useState, useEffect } from 'react'
import { getCertificates } from '../api/certificates'

export function useCertificates() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    getCertificates()
      .then((data) => {
        if (isMounted) {
          setCertificates(data || [])
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
