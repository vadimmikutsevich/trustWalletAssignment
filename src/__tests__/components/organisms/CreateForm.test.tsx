import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { CreateForm } from '../../../components/organisms/CreateForm'
import { useWalletStore } from '../../../store/walletStore'

vi.mock('ethers', async () => {
  const actual = await vi.importActual<typeof import('ethers')>('ethers')
  return {
    ...actual,
    Wallet: {
      ...actual.Wallet,
      createRandom: () => ({
        address: '0x1234567890abcdef1234567890abcdef12345678',
        encrypt: vi.fn().mockResolvedValue('{"crypto":{}}'),
      }),
    },
  }
})

beforeEach(() => {
  useWalletStore.setState({ wallets: [], networkId: 'sepolia' })
})

describe('CreateForm', () => {
  it('displays error if password is invalid', () => {
    render(<CreateForm />)

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm/i), {
      target: { value: '456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /generate wallet/i }))

    expect(
      screen.getByText(/passwords must match and be ≥ 8 chars/i),
    ).toBeInTheDocument()
  })

  it('generates and adds wallet on valid password', async () => {
    render(<CreateForm />)

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'StrongPass123!' },
    })
    fireEvent.change(screen.getByLabelText(/confirm/i), {
      target: { value: 'StrongPass123!' },
    })

    fireEvent.click(screen.getByRole('button', { name: /generate wallet/i }))

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /created!/i }),
      ).toBeInTheDocument(),
    )

    const wallets = useWalletStore.getState().wallets
    expect(wallets.length).toBe(1)
    expect(wallets[0].address).toBe(
      '0x1234567890abcdef1234567890abcdef12345678',
    )
    expect(wallets[0].jsonPk).toMatch(/"crypto":/)
  })
})
