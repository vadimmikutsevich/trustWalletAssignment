export const networks = {
  sepolia: {
    id: 'sepolia',
    name: 'Sepolia (ETH)',
    rpc: import.meta.env.VITE_RPC_SEPOLIA as string,
    explorer: 'https://sepolia.etherscan.io',
  },
  bsctest: {
    id: 'bsctest',
    name: 'BSC Testnet',
    rpc: import.meta.env.VITE_RPC_BSCTEST as string,
    explorer: 'https://testnet.bscscan.com',
  },
  polygon: {
    id: 'polygon',
    name: 'Polygon PoS',
    rpc: import.meta.env.VITE_RPC_POLYGON as string,
    explorer: 'https://polygonscan.com',
  },
} as const

export type NetworkId = keyof typeof networks
