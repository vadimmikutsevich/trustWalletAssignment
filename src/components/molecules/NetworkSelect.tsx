import { useState } from 'react'
import { Input } from '../atoms/Input'
import { networks } from '../../constants/networks'
import { useWalletStore } from '../../store/walletStore'

const ROW = 36
const WINDOW = 16
const OPTIONS = Object.values(networks)

export function NetworkSelect() {
  const { networkId, setNetwork } = useWalletStore()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scroll, setScr] = useState(0)

  const selected = networks[networkId]

  const filtered = query
    ? OPTIONS.filter((n) => n.name.toLowerCase().includes(query.toLowerCase()))
    : OPTIONS

  const start = Math.floor(scroll / ROW)
  const slice = filtered.slice(start, start + WINDOW)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full border rounded-md px-3 py-2 text-left"
      >
        {selected.name}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow">
          <Input
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 border-b"
          />

          <div
            style={{ maxHeight: ROW * WINDOW }}
            onScroll={(e) => setScr(e.currentTarget.scrollTop)}
            className="overflow-auto"
          >
            <div style={{ height: filtered.length * ROW }} className="relative">
              {slice.map((n, i) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setNetwork(n.id)
                    setOpen(false)
                    setQuery('')
                  }}
                  style={{ top: (start + i) * ROW, height: ROW }}
                  className={`absolute left-0 right-0 px-3 text-left text-sm
                    hover:bg-sky-blue/10 ${
                      n.id === networkId ? 'bg-royal-blue/10' : ''
                    }`}
                >
                  {n.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
