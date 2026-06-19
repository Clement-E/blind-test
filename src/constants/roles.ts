export const ROLE_MASTER = 'maitre' as const
export const ROLE_PLAYER = 'joueur' as const

export type Role = typeof ROLE_MASTER | typeof ROLE_PLAYER
