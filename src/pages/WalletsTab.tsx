import { NetworkSelect } from '../components/molecules/NetworkSelect'
import { WalletList } from '../components/organisms/WalletList'

export function WalletsTab() {
  return (
    <div className="p-4 space-y-4">
      <NetworkSelect />
      <WalletList />
    </div>
  )
}
