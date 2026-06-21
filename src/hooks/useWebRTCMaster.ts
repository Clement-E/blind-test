import { useCallback, useEffect, useRef, useState } from 'react'
import { getIceServers } from '@/lib/iceServers'

function getWsUrl(): string {
  return (import.meta.env.VITE_API_URL as string).replace(/^http/, 'ws')
}

export function useWebRTCMaster(gameId: string | null) {
  const wsRef = useRef<WebSocket | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const peersRef = useRef(new Map<string, RTCPeerConnection>())
  const [isCapturing, setIsCapturing] = useState(false)
  const [playerCount, setPlayerCount] = useState(0)
  const [playerEventCount, setPlayerEventCount] = useState(0)

  useEffect(() => {
    if (!gameId) return

    const ws = new WebSocket(getWsUrl())
    wsRef.current = ws

    const createPeer = async (pId: string) => {
      if (!streamRef.current) return
      const peer = new RTCPeerConnection({ iceServers: getIceServers() })
      peersRef.current.set(pId, peer)

      streamRef.current.getAudioTracks().forEach(t => peer.addTrack(t, streamRef.current!))

      peer.onicecandidate = (e) => {
        if (e.candidate) {
          ws.send(JSON.stringify({ type: 'ice', gameId, playerId: pId, candidate: e.candidate.toJSON() }))
        }
      }

      const offer = await peer.createOffer()
      await peer.setLocalDescription(offer)
      ws.send(JSON.stringify({ type: 'offer', gameId, playerId: pId, sdp: offer }))
    }

    ws.onopen = () => ws.send(JSON.stringify({ type: 'join', gameId, role: 'master' }))
    ws.onerror = (e) => console.error('[WS Master] erreur', e)
    ws.onclose = (e) => console.warn('[WS Master] connexion fermée', e.code, e.reason)

    ws.onmessage = async (event) => {
      if (event.data === 'ping') { ws.send('pong'); return }
      const msg = JSON.parse(event.data as string)
      switch (msg.type) {
        case 'player_joined':
          setPlayerCount(n => n + 1)
          setPlayerEventCount(n => n + 1)
          await createPeer(msg.playerId)
          break
        case 'player_left':
          setPlayerCount(n => Math.max(0, n - 1))
          setPlayerEventCount(n => n + 1)
          peersRef.current.get(msg.playerId)?.close()
          peersRef.current.delete(msg.playerId)
          break
        case 'answer':
          await peersRef.current.get(msg.playerId)?.setRemoteDescription(new RTCSessionDescription(msg.sdp))
          break
        case 'ice':
          if (msg.candidate) {
            await peersRef.current.get(msg.playerId)?.addIceCandidate(new RTCIceCandidate(msg.candidate))
          }
          break
      }
    }

    return () => {
      ws.close()
      peersRef.current.forEach(p => p.close())
      peersRef.current.clear()
    }
  }, [gameId])

  const startCapture = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        } as MediaTrackConstraints,
      })
      // On ne garde que l'audio — la vidéo est requise par certains navigateurs pour ouvrir la boîte
      stream.getVideoTracks().forEach(t => t.stop())

      if (stream.getAudioTracks().length === 0) {
        stream.getTracks().forEach(t => t.stop())
        alert('Aucun audio capturé. Recommence le partage en cochant "Partager l\'audio du système" dans la boîte de dialogue.')
        return
      }

      streamRef.current = stream
      setIsCapturing(true)

      stream.getAudioTracks()[0]?.addEventListener('ended', () => {
        setIsCapturing(false)
        streamRef.current = null
      })

      // Créer les peers pour les joueurs déjà connectés avant la capture
      wsRef.current?.send(JSON.stringify({ type: 'request_players', gameId }))
    } catch {
      // L'utilisateur a annulé la capture
    }
  }, [gameId])

  const triggerSyncStart = useCallback(() => {
    wsRef.current?.send(JSON.stringify({ type: 'sync_start', gameId }))
  }, [gameId])

  return { isCapturing, playerCount, playerEventCount, startCapture, triggerSyncStart }
}
