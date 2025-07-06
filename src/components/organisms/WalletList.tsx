import { WalletRow } from './/WalletRow'

const mockWallets = [
  {
    id: '1',
    address: '0x9d3F…6A42',
    balance: '0.7314 ETH',
  },
  {
    id: '2',
    address: '0xA5cB…F1e9',
    balance: '12.0012 ETH',
  },
]

export function WalletList() {
  if (!mockWallets.length) return <p>No wallets yet</p>

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500">
          <th className="py-2">Address</th>
          <th className="py-2 text-right">Balance</th>
        </tr>
      </thead>
      <tbody>
        {mockWallets.map((w) => (
          <WalletRow key={w.id} address={w.address} balance={w.balance} />
        ))}
      </tbody>
    </table>
  )
}
