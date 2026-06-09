const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string
const REDIRECT_URI = `${window.location.origin}/`
const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-modify-playback-state',
  'user-read-playback-state',
].join(' ')

// ─── PKCE helpers ─────────────────────────────────────────────────────────────

function generateRandomString(length: number): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('').slice(0, length)
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain))
}

function base64url(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

// ─── Auth flow ────────────────────────────────────────────────────────────────

export async function initiateSpotifyLogin(): Promise<void> {
  const verifier = generateRandomString(64)
  const challenge = base64url(await sha256(verifier))
  sessionStorage.setItem('spotify_pkce_verifier', verifier)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  })

  window.location.href = `https://accounts.spotify.com/authorize?${params}`
}

async function exchangeCode(code: string): Promise<void> {
  const verifier = sessionStorage.getItem('spotify_pkce_verifier')
  if (!verifier) throw new Error('PKCE verifier missing')

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: verifier,
    }),
  })

  const data = await res.json()
  if (!data.access_token) throw new Error('Token exchange failed: ' + JSON.stringify(data))

  localStorage.setItem('spotify_access_token', data.access_token)
  localStorage.setItem('spotify_refresh_token', data.refresh_token)
  localStorage.setItem('spotify_expires_at', String(Date.now() + data.expires_in * 1000))
  sessionStorage.removeItem('spotify_pkce_verifier')
}

async function refreshAccessToken(): Promise<void> {
  const refreshToken = localStorage.getItem('spotify_refresh_token')
  if (!refreshToken) throw new Error('No refresh token')

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    }),
  })

  const data = await res.json()
  if (!data.access_token) throw new Error('Refresh failed: ' + JSON.stringify(data))

  localStorage.setItem('spotify_access_token', data.access_token)
  if (data.refresh_token) localStorage.setItem('spotify_refresh_token', data.refresh_token)
  localStorage.setItem('spotify_expires_at', String(Date.now() + data.expires_in * 1000))
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('spotify_access_token')
}

export async function getAccessToken(): Promise<string | null> {
  if (!isAuthenticated()) return null

  const expiresAt = Number(localStorage.getItem('spotify_expires_at') ?? 0)
  if (Date.now() > expiresAt - 60_000) {
    try {
      await refreshAccessToken()
    } catch {
      return null
    }
  }

  return localStorage.getItem('spotify_access_token')
}

/** Call on app init: detects ?code= in URL, exchanges it, cleans up URL. */
export async function handleOAuthCallback(): Promise<boolean> {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  if (!code) return false

  try {
    await exchangeCode(code)
    window.history.replaceState({}, '', window.location.pathname)
    return true
  } catch (err) {
    console.error('[Spotify PKCE] callback error', err)
    return false
  }
}
