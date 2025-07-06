import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { useWalletStore } from '../../../store/walletStore'
import { WalletActionsPanel } from '../../../components/organisms/WalletActionsPanel'

// Mock Wallet.fromEncryptedJson
vi.mock('ethers', async () => {
  const actual = await vi.importActual<typeof import('ethers')>('ethers')
  return {
    ...actual,
    Wallet: {
      ...actual.Wallet,
      fromEncryptedJson: vi.fn().mockImplementation((json, pw) => {
        if (pw !== 'StrongPass123!') {
          throw new Error('Wrong password')
        }
        return Promise.resolve({
          privateKey: '0xabc123privatekey',
        })
      }),
    },
  }
})

beforeAll(() => {
  // @ts-ignore
  global.navigator.clipboard = {
    writeText: vi.fn().mockResolvedValue(undefined),
  }
})

const password = 'StrongPass123!'
const privateKey = '0xabc123privatekey'
const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`
const jsonPk = '{"crypto":{}}'

describe('WalletActionsPanel', () => {
  const props = {
    walletId: 'test-id',
    address,
    jsonPk,
    onClose: vi.fn(),
  }

  beforeEach(() => {
    useWalletStore.setState({
      wallets: [{ id: props.walletId, address: props.address, jsonPk }],
      networkId: 'sepolia',
    })
    vi.clearAllMocks()
  })

  it('shows private key with correct password', async () => {
    render(<WalletActionsPanel {...props} />)

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: password },
    })
    fireEvent.click(screen.getByRole('button', { name: /show pk/i }))

    await waitFor(() => {
      expect(screen.getByText(privateKey)).toBeInTheDocument()
    })
  })

  it('shows error with wrong password', async () => {
    render(<WalletActionsPanel {...props} />)

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    })
    fireEvent.click(screen.getByRole('button', { name: /show pk/i }))

    await waitFor(() => {
      expect(screen.getByText(/wrong password/i)).toBeInTheDocument()
    })
  })

  it('calls removeWallet and onClose when delete is clicked', () => {
    render(<WalletActionsPanel {...props} />)

    fireEvent.click(screen.getByRole('button', { name: /delete/i }))

    expect(useWalletStore.getState().wallets.length).toBe(0)
    expect(props.onClose).toHaveBeenCalled()
  })

  it('copies address to clipboard', () => {
    render(<WalletActionsPanel {...props} />)

    fireEvent.click(screen.getByRole('button', { name: /copy/i }))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(address)
  })

  it('copies private key after unlock', async () => {
    render(<WalletActionsPanel {...props} />)

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: password },
    })
    fireEvent.click(screen.getByRole('button', { name: /show pk/i }))

    await waitFor(() => screen.getByText(privateKey))

    fireEvent.click(screen.getByRole('button', { name: /copy pk/i }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(privateKey)
  })

  it('closes panel after private key shown', async () => {
    render(<WalletActionsPanel {...props} />)

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: password },
    })
    fireEvent.click(screen.getByRole('button', { name: /show pk/i }))

    await waitFor(() => screen.getByText(privateKey))

    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(props.onClose).toHaveBeenCalled()
  })
})
