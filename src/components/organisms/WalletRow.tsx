interface Props {
  address: string
  balance: string
}

export function WalletRow({ address, balance }: Props) {
  return (
    <tr className="even:bg-gray-50">
      <td className="py-2 font-mono text-xs">{address}</td>
      <td className="py-2 text-right">{balance}</td>
    </tr>
  )
}
