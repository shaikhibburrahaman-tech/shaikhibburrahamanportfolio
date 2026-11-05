import { useEffect, useState } from 'react'

/** Fetches data once; falls back to bundled sample data if the API is unreachable. */
export function useApi(fetcher, fallback) {
  const [state, setState] = useState({ data: null, loading: true, offline: false })
  useEffect(() => {
    let alive = true
    fetcher()
      .then((data) => alive && setState({ data, loading: false, offline: false }))
      .catch(() => alive && setState({ data: fallback, loading: false, offline: true }))
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return state
}
