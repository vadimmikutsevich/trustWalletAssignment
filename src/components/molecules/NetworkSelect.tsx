import { useState } from 'react'
import { Input } from '../atoms/Input'

const networks = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Testnet #${i}`,
}))

const ROW = 36
const WINDOW = 16

export function NetworkSelect() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(networks[0])
  const [open, setOpen] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  const filtered = query
    ? networks.filter((n) => n.name.toLowerCase().includes(query.toLowerCase()))
    : networks

  const start = Math.floor(scrollTop / ROW)
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
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
            className="overflow-auto"
          >
            <div style={{ height: filtered.length * ROW }} className="relative">
              {slice.map((n, i) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setSelected(n)
                    setOpen(false)
                    setQuery('')
                  }}
                  style={{ top: (start + i) * ROW, height: ROW }}
                  className={`absolute left-0 right-0 px-3 text-left text-sm
                    hover:bg-sky-blue/10 ${
                      n.id === selected.id ? 'bg-royal-blue/10' : ''
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
