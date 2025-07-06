import { useQuery } from '@tanstack/react-query'
import { formatEther } from 'ethers'

import { getProvider } from '../../utils/getProvider'
import { useWalletStore } from '../../store/walletStore'

export function useBalance(address: `0x${string}`) {
  const networkId = useWalletStore((s) => s.networkId)

  return useQuery({
    queryKey: ['balance', address, networkId],
    queryFn: async () => {
      const wei = await getProvider(networkId).getBalance(address)
      return parseFloat(formatEther(wei)).toFixed(4)
    },
    staleTime: 30_000,
    refetchInterval: 30_000,
    retry: 1,
  })
}
