const BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  })
  let body = null
  try { body = await res.json() } catch { /* empty body */ }
  if (!res.ok) {
    const err = new Error(body?.detail || `Request failed (${res.status})`)
    err.status = res.status
    err.fields = body && typeof body === 'object' ? body : {}
    throw err
  }
  return body
}

export const api = {
  profile: () => request('/profile/'),
  projects: () => request('/projects/'),
  education: () => request('/education/'),
  skills: () => request('/skills/'),
  career: () => request('/career/'),
  sendContact: (payload) => request('/contact/', { method: 'POST', body: JSON.stringify(payload) }),
}
