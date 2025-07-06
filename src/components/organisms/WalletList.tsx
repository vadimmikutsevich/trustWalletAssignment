import { useWalletStore } from '../../store/walletStore'
import { WalletRow } from './WalletRow'

export function WalletList() {
  const wallets = useWalletStore((s) => s.wallets)

  if (!wallets.length) return <p>No wallets yet</p>

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500">
          <th className="py-2">Address</th>
          <th className="py-2 text-right">Balance</th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((w) => (
          <WalletRow
            key={w.id}
            address={w.address}
            jsonPk={w.jsonPk}
            walletId={w.id}
          />
        ))}
      </tbody>
    </table>
  )
}
