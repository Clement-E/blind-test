import { useEffect, useRef, useState } from 'react'

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
]

function getWsUrl(): string {
  return (import.meta.env.VITE_API_URL as string).replace(/^http/, 'ws')
}

export type StreamStatus = 'waiting' | 'connected' | 'playing'

export function useWebRTCPlayer(gameId: string | null) {
  const wsRef = useRef<WebSocket | null>(null)
  const peerRef = useRef<RTCPeerConnection | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const [status, setStatus] = useState<StreamStatus>('waiting')

  useEffect(() => {
    if (!gameId) return

    const ws = new WebSocket(getWsUrl())
    wsRef.current = ws

    ws.onopen = () => ws.send(JSON.stringify({ type: 'join', gameId, role: 'player' }))
    ws.onerror = (e) => console.error('[WS Player] erreur', e)
    ws.onclose = (e) => console.warn('[WS Player] connexion fermée', e.code, e.reason)

    ws.onmessage = async (event) => {
      if (event.data === 'ping') { ws.send('pong'); return }
      const msg = JSON.parse(event.data as string)

      switch (msg.type) {
        case 'offer': {
          const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS })
          peerRef.current = peer

          peer.onicecandidate = (e) => {
            if (e.candidate) {
              ws.send(JSON.stringify({ type: 'ice', gameId, candidate: e.candidate.toJSON() }))
            }
          }

          peer.ontrack = async (e) => {
            const audioCtx = new AudioContext()
            audioCtxRef.current = audioCtx

            await audioCtx.resume()

            const source = audioCtx.createMediaStreamSource(e.streams[0])
            const gain = audioCtx.createGain()
            gainRef.current = gain

            // Silence total jusqu'au signal sync_start
            gain.gain.value = 0
            source.connect(gain)
            gain.connect(audioCtx.destination)
            setStatus('connected')
          }

          await peer.setRemoteDescription(new RTCSessionDescription(msg.sdp))
          const answer = await peer.createAnswer()
          await peer.setLocalDescription(answer)
          ws.send(JSON.stringify({ type: 'answer', gameId, sdp: answer }))
          break
        }

        case 'ice':
          if (peerRef.current && msg.candidate) {
            await peerRef.current.addIceCandidate(new RTCIceCandidate(msg.candidate))
          }
          break

        case 'sync_start': {
          const audioCtx = audioCtxRef.current
          const gain = gainRef.current
          if (!audioCtx || !gain) break

          // Calcule l'instant précis dans l'horloge interne de l'AudioContext
          const delayMs = Math.max(0, (msg.timestamp as number) - Date.now())
          const scheduleAt = audioCtx.currentTime + delayMs / 1000

          // Unmute précis via l'API Web Audio — pas de setTimeout flottant
          gain.gain.setValueAtTime(1, scheduleAt)

          setTimeout(() => setStatus('playing'), delayMs)
          break
        }
      }
    }

    return () => {
      ws.close()
      peerRef.current?.close()
      audioCtxRef.current?.close()
    }
  }, [gameId])

  return { status }
}
