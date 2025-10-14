const API_URL = import.meta.env.VITE_API_URL || ''
async function postJson(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) {
    const text = await res.text().catch(()=>'')
    throw new Error(text || `HTTP ${res.status}`)
  }
  return res.text()
}
export const api = { postJson }
