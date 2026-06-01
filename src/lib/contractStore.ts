// Local-first contract store — persists to localStorage.
// Drop-in replacement for the Supabase contracts table.

const KEY = 'nexwork_contracts';

export interface Contract {
  id: string;
  title: string;
  client: string;
  status: 'Draft' | 'Signed';
  content: string;
  service_type: string;
  value: string;
  created_at: string;
}

const load = (): Contract[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
};

const save = (contracts: Contract[]) => {
  localStorage.setItem(KEY, JSON.stringify(contracts));
};

export const contractStore = {
  getAll(): Contract[] {
    return load().sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  getById(id: string): Contract | undefined {
    return load().find((c) => c.id === id);
  },

  create(data: Omit<Contract, 'id' | 'created_at'>): Contract {
    const contracts = load();
    const contract: Contract = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    save([...contracts, contract]);
    return contract;
  },

  update(id: string, patch: Partial<Contract>): Contract | null {
    const contracts = load();
    const idx = contracts.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    contracts[idx] = { ...contracts[idx], ...patch };
    save(contracts);
    return contracts[idx];
  },

  remove(id: string): void {
    save(load().filter((c) => c.id !== id));
  },
};
