import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WalletMeta } from '../types/wallet'
import type { NetworkId } from '../constants/networks'

interface WalletState {
  wallets: WalletMeta[]
  networkId: NetworkId
  addWallet(wallet: WalletMeta): void
  removeWallet(id: string): void
  setNetwork(id: NetworkId): void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      wallets: [],
      networkId: 'sepolia',
      addWallet: (w) => set((s) => ({ wallets: [w, ...s.wallets] })),
      removeWallet: (id) =>
        set((s) => ({ wallets: s.wallets.filter((w) => w.id !== id) })),
      setNetwork: (id) => set({ networkId: id }),
    }),
    {
      name: 'wallet-keeper',
      partialize: (s) => ({ wallets: s.wallets, networkId: s.networkId }),
    },
  ),
)
