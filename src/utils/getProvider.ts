import { JsonRpcProvider } from 'ethers'
import { networks, type NetworkId } from '../constants/networks'

const cache = new Map<NetworkId, JsonRpcProvider>()

export function getProvider(id: NetworkId) {
  if (!cache.has(id)) cache.set(id, new JsonRpcProvider(networks[id].rpc))
  return cache.get(id)!
}
