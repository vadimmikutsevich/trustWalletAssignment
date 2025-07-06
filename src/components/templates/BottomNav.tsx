import { useState } from 'react'

import { WalletsTab } from '../../pages/WalletsTab'
import { AddTab } from '../../pages/AddTab'
import { SettingsTab } from '../../pages/SettingsTab'

const TABS = [
  { id: 'wallets', label: 'Wallets', element: <WalletsTab /> },
  { id: 'add', label: 'Create', element: <AddTab /> },
  { id: 'settings', label: 'Settings', element: <SettingsTab /> },
] as const
type TabId = (typeof TABS)[number]['id']

export function BottomNav() {
  const [active, setActive] = useState<TabId>('wallets')

  const ActiveScreen = TABS.find((t) => t.id === active)!.element

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">{ActiveScreen}</div>

      <nav className="flex bg-white border-t">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex-1 py-3 text-sm font-medium
              ${active === id ? 'text-royal-blue' : 'text-gray-500'}`}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}
