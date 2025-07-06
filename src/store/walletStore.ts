import { create } from "zustand";
import { nanoid } from "nanoid";

export interface Wallet {
  id: string;
  address: string;
  encryptedPk: string;
}

interface WalletState {
  wallets: Wallet[];
  addMock(): void;
}

export const useWalletStore = create<WalletState>((set) => ({
  wallets: [],
  addMock: () =>
    set((s) => ({
      wallets: [
        ...s.wallets,
        {
          id: nanoid(),
          address: `0x${nanoid(40)}`,
          encryptedPk: "***mock***",
        },
      ],
    })),
}));
