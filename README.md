# Wallet Keeper

A simple React-based wallet manager that allows users to generate, store, and decrypt Ethereum-compatible wallets securely.

## 🚀 Features

- 🔐 Generate and encrypt EVM-compatible wallets (Ethereum, BNB Chain, etc.)
- 💾 Store encrypted wallets in `localStorage`
- 🧾 View wallet list with testnet balance
- 🔑 Reveal private key after password verification
- ❌ Never store passwords or plaintext private keys

## 🛠 Tech Stack

- **React 19** + **Vite**
- **TypeScript**
- **Zustand** for state management
- **React Query** for data fetching
- **Tailwind CSS** for styling
- **Ethers.js** for wallet operations
- **Vitest** + **Testing Library** for testing

## 📦 Scripts

| Command        | Description                   |
| -------------- | ----------------------------- |
| `pnpm dev`     | Start development server      |
| `pnpm build`   | Type-check and build for prod |
| `pnpm preview` | Preview the production build  |
| `pnpm test`    | Run unit tests with Vitest    |
| `pnpm lint`    | Run ESLint                    |
| `pnpm format`  | Run Prettier formatter        |

## 📋 Requirements & Constraints

- Store only **encrypted wallets** (JSON) in `localStorage`
- Do **not** persist user passwords
- Do **not** store private keys in plaintext
- Keep UI minimal (no UI kits)
- Focus on architecture and test coverage

## ✅ Testing

Unit tests cover:

- Wallet generation and encryption
- Password validation
- Private key decryption
- Clipboard interactions
- Custom hooks (`useBalance`)

---

This project was built as part of a **Frontend Engineer Technical Test**.
