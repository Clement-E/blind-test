import { useCallback, useEffect, useRef, useState } from 'react'
import { getIceServers } from '@/lib/iceServers'

function getWsUrl(): string {
  return (import.meta.env.VITE_API_URL as string).replace(/^http/, 'ws')
}

export type StreamStatus = 'waiting' | 'connected' | 'playing'

export function useWebRTCPlayer(gameId: string | null) {
  const wsRef = useRef<WebSocket | null>(null)
  const peerRef = useRef<RTCPeerConnection | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const syncReceivedRef = useRef(false)
  const [status, setStatus] = useState<StreamStatus>('waiting')
  const [audioUnlocked, setAudioUnlocked] = useState(false)

  // Must be called from a user gesture (button click) to satisfy autoplay policy.
  const resumeAudio = useCallback(async () => {
    const ctx = audioCtxRef.current
    if (!ctx) return
    await ctx.resume()
    // If sync_start already arrived while context was suspended, unmute immediately.
    if (syncReceivedRef.current && gainRef.current) {
      gainRef.current.gain.value = 1
    }
    setAudioUnlocked(true)
  }, [])

  useEffect(() => {
    if (!gameId) return

    // Create the AudioContext now (suspended) so the audio graph can be wired in
    // ontrack without needing a user gesture at that point.
    const audioCtx = new AudioContext()
    audioCtxRef.current = audioCtx

    const ws = new WebSocket(getWsUrl())
    wsRef.current = ws

    const dbPlayerId = sessionStorage.getItem('blindtest_player_id')
    ws.onopen = () => ws.send(JSON.stringify({ type: 'join', gameId, role: 'player', dbPlayerId }))
    ws.onerror = (e) => console.error('[WS Player] erreur', e)
    ws.onclose = (e) => console.warn('[WS Player] connexion fermée', e.code, e.reason)

    ws.onmessage = async (event) => {
      if (event.data === 'ping') { ws.send('pong'); return }
      const msg = JSON.parse(event.data as string)

      switch (msg.type) {
        case 'offer': {
          const peer = new RTCPeerConnection({ iceServers: getIceServers() })
          peerRef.current = peer

          peer.onicecandidate = (e) => {
            if (e.candidate) {
              ws.send(JSON.stringify({ type: 'ice', gameId, candidate: e.candidate.toJSON() }))
            }
          }

          peer.ontrack = (e) => {
            const source = audioCtx.createMediaStreamSource(e.streams[0])
            const gain = audioCtx.createGain()
            gainRef.current = gain
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
          const gain = gainRef.current
          if (!gain) break

          syncReceivedRef.current = true

          if (audioCtx.state === 'suspended') {
            // Context not yet unlocked by user — resumeAudio() will unmute on click.
            setTimeout(() => setStatus('playing'), 0)
            break
          }

          const delayMs = Math.max(0, (msg.timestamp as number) - Date.now())
          const scheduleAt = audioCtx.currentTime + delayMs / 1000
          gain.gain.setValueAtTime(1, scheduleAt)
          setTimeout(() => setStatus('playing'), delayMs)
          break
        }
      }
    }

    return () => {
      ws.close()
      peerRef.current?.close()
      audioCtx.close()
      audioCtxRef.current = null
      syncReceivedRef.current = false
    }
  }, [gameId])

  return { status, audioUnlocked, resumeAudio }
}
