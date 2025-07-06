import { NetworkSelect } from '../components/molecules/NetworkSelect'

export function SettingsTab() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Network</h2>
      <NetworkSelect />
    </div>
  )
}
