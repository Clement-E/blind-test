const API_URL = import.meta.env.VITE_API_URL;
console.log("%c 2 --> Line: 2||playersService.ts\n API_URL: ","color:#0f0;", API_URL);


export type Player = {
  id: number;
  name: string;
  email: string;
  game_id: string;
};

export const playerKeys = {
  all: ['players'] as const,
  detail: (id: string) => ['players', id] as const,
};

export const playersService = {
  getAll: async (): Promise<Player[]> => {
    const res = await fetch(`${API_URL}/api/players`);
    if (!res.ok) throw new Error('Erreur chargement joueurs');
    return res.json();
  },

  getById: async (id: string): Promise<Player> => {
    const res = await fetch(`${API_URL}/api/players/${id}`);
    if (!res.ok) throw new Error('Joueur non trouvé');
    return res.json();
  },

  create: async (player: Player): Promise<Player> => {
    const res = await fetch(`${API_URL}/api/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player),
    });
    if (!res.ok) throw new Error('Erreur création');
    return res.json();
  },

  update: async (id: string, data: Partial<Player>): Promise<Player> => {
    const res = await fetch(`${API_URL}/api/players/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erreur modification');
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/api/players/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Erreur suppression');
  },
};