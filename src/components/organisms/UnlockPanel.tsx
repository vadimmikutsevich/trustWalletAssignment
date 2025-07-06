import { useState } from 'react'
import { PasswordField } from '../atoms/PasswordField'
import { Button } from '../atoms/Button'

interface Props {
  onClose(): void
}

export function UnlockPanel({ onClose }: Props) {
  const [pkVisible, setPkVisible] = useState(false)

  return (
    <div className="mt-2 rounded-lg border p-3 bg-gray-50">
      {!pkVisible ? (
        <>
          <PasswordField label="Password" name="unlock" />
          <div className="mt-3 flex gap-2">
            <Button disabled className="flex-1">
              Show PK
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between font-mono text-xs">
          0xDEADBEEF…
          <Button variant="secondary" disabled>
            Copy
          </Button>
        </div>
      )}
    </div>
  )
}
