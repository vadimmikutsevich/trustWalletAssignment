import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import * as useBalanceModule from '../../../hooks/useBalance'
import { WalletRow } from '../../../components/organisms/WalletRow'

vi.mock('../../../hooks/useBalance', () => ({
  useBalance: vi.fn(),
}))

describe('WalletRow', () => {
  const mockedUseBalance = useBalanceModule.useBalance as unknown as ReturnType<
    typeof vi.fn
  >

  beforeEach(() => {
    mockedUseBalance.mockReturnValue({
      data: '0.1234',
      isLoading: false,
      isError: false,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Render balance from the hook', () => {
    render(
      <table>
        <tbody>
          <WalletRow
            address="0x1234567890abcdef"
            jsonPk="{}"
            walletId="test-wallet"
          />
        </tbody>
      </table>,
    )

    expect(screen.getByText('0.1234')).toBeInTheDocument()
  })
})
