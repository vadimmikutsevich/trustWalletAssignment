import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import React from 'react'
import { useBalance } from '../../hooks/useBalance'

const queryClient = new QueryClient()

vi.mock('../../utils/getProvider', () => ({
  getProvider: () => ({
    getBalance: vi.fn().mockResolvedValue(BigInt('1000000000000000000')),
  }),
}))

afterEach(() => {
  queryClient.clear()
})

test('useBalance formats ETH', async () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  const { result } = renderHook(() => useBalance('0xAbc'), { wrapper })

  await waitFor(() => {
    expect(result.current.data).toBe('1.0000')
  })
})
