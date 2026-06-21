export function getIceServers(): RTCIceServer[] {
  const servers: RTCIceServer[] = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ]

  const url  = import.meta.env.VITE_TURN_URL        as string | undefined
  const user = import.meta.env.VITE_TURN_USERNAME   as string | undefined
  const cred = import.meta.env.VITE_TURN_CREDENTIAL as string | undefined

  if (url && user && cred) {
    servers.push({ urls: url, username: user, credential: cred })
  }

  return servers
}
