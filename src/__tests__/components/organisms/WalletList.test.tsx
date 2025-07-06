import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useWalletStore } from '../../../store/walletStore'
import { WalletList } from '../../../components/organisms/WalletList'

vi.mock('../../../hooks/useBalance', () => ({
  useBalance: () => ({ data: '0.1234' }),
}))

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('WalletList', () => {
  beforeEach(() => {
    useWalletStore.setState({ wallets: [], networkId: 'sepolia' })
  })

  it('shows placeholder text if no wallets', () => {
    render(<WalletList />, { wrapper })
    expect(screen.getByText(/no wallets yet/i)).toBeInTheDocument()
  })

  it('renders table with wallet rows', () => {
    useWalletStore.setState({
      wallets: [
        {
          id: 'test-id',
          address: '0x1234567890abcdef1234567890abcdef12345678',
          jsonPk: '{"test":"data"}',
        },
      ],
      networkId: 'sepolia',
    })

    render(<WalletList />, { wrapper })

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText(/address/i)).toBeInTheDocument()
    expect(screen.getByText(/balance/i)).toBeInTheDocument()
    expect(screen.getByText(/0x1234/i)).toBeInTheDocument()
  })
})
