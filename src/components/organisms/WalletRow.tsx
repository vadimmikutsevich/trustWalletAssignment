import { useState } from 'react'
import { WalletActionsPanel } from './WalletActionsPanel'
import { Spinner } from '../atoms/Spinner'
import { useBalance } from '../../hooks/useBalance'

interface Props {
  walletId: string
  address: `0x${string}`
  jsonPk: string
}

export function WalletRow({ address, jsonPk, walletId }: Props) {
  const [open, setOpen] = useState(false)
  const { data, isLoading, isError } = useBalance(address)

  return (
    <>
      <tr
        className="cursor-pointer even:bg-gray-50 hover:bg-gray-100 border-b last:border-b-0"
        onClick={() => setOpen((o) => !o)}
      >
        <td className="py-2 pl-2 font-mono text-xs truncate">
          {address.slice(0, 8)}…{address.slice(-4)}
        </td>

        <td className="py-2 pr-2 text-right min-w-[90px] flex justify-end">
          {isLoading ? <Spinner /> : isError || data == null ? '—' : `${data}`}
        </td>
      </tr>

      {open && (
        <tr>
          <td colSpan={2} className="px-2">
            <WalletActionsPanel
              walletId={walletId}
              address={address}
              jsonPk={jsonPk}
              onClose={() => setOpen(false)}
            />
          </td>
        </tr>
      )}
    </>
  )
}
