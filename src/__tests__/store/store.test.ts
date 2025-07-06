import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useWalletStore } from '../../store/walletStore'
import type { WalletMeta } from '../../types/wallet'

beforeEach(() => {
  localStorage.clear()
  useWalletStore.setState({ wallets: [], networkId: 'sepolia' })
})

afterEach(() => {
  useWalletStore.persist.clearStorage()
})

describe('useWalletStore', () => {
  const wallet: WalletMeta = {
    id: '1',
    address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    jsonPk: '{"crypto":{}}',
  }

  it('adds wallet', () => {
    useWalletStore.getState().addWallet(wallet)
    const state = useWalletStore.getState()
    expect(state.wallets).toHaveLength(1)
    expect(state.wallets[0].id).toBe(wallet.id)
  })

  it('removes wallet', () => {
    useWalletStore.getState().addWallet(wallet)
    useWalletStore.getState().removeWallet(wallet.id)
    const state = useWalletStore.getState()
    expect(state.wallets).toHaveLength(0)
  })

  it('sets networkId', () => {
    useWalletStore.getState().setNetwork('sepolia')
    const state = useWalletStore.getState()
    expect(state.networkId).toBe('sepolia')
  })

  it('persists state in localStorage', () => {
    useWalletStore.getState().addWallet(wallet)
    const saved = localStorage.getItem('wallet-keeper')
    expect(saved).toContain(wallet.address.slice(2))
  })
})
