import { useState } from 'react'
import { Wallet } from 'ethers'
import { PasswordField } from '../atoms/PasswordField'
import { Button } from '../atoms/Button'
import { Spinner } from '../atoms/Spinner'
import { useWalletStore } from '../../store/walletStore'

interface Props {
  walletId: string
  address: `0x${string}`
  jsonPk: string
  onClose(): void
}

export function WalletActionsPanel({
  walletId,
  address,
  jsonPk,
  onClose,
}: Props) {
  const removeWallet = useWalletStore((s) => s.removeWallet)

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pk, setPk] = useState<string | null>(null)
  const [copiedPk, setCopiedPk] = useState(false)
  const [copiedAd, setCopiedAd] = useState(false)

  const handleShowPk = async () => {
    setLoading(true)
    setError('')
    try {
      const w = await Wallet.fromEncryptedJson(jsonPk, password)
      setPk(w.privateKey)
    } catch {
      setError('Wrong password')
    } finally {
      setLoading(false)
    }
  }

  const copyPk = () => {
    navigator.clipboard.writeText(pk!)
    setCopiedPk(true)
    setTimeout(() => setCopiedPk(false), 2000)
  }
  const copyAddr = () => {
    navigator.clipboard.writeText(address)
    setCopiedAd(true)
    setTimeout(() => setCopiedAd(false), 2000)
  }

  return (
    <div className="mt-2 rounded-lg border p-3 bg-gray-50 space-y-3">
      <div className="flex flex-col gap-2 text-xs font-mono break-all bg-white p-2 rounded-md border">
        <div>{address}</div>

        <div className="flex items-center justify-end gap-x-2">
          <Button
            variant="secondary"
            onClick={() => {
              removeWallet(walletId)
              onClose()
            }}
            className=" text-red-500 border-red-300"
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={copyAddr} disabled={copiedAd}>
            {copiedAd ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>

      <hr />
      {!pk ? (
        <>
          <PasswordField
            label="Password"
            name="unlock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2">
            <Button
              onClick={handleShowPk}
              disabled={loading || password.length === 0}
              className="flex-1 flex items-center justify-center gap-2"
            >
              {loading && <Spinner />} Show&nbsp;PK
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <div className="font-mono text-xs break-all bg-white p-2 rounded-md border">
            {pk}
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={copyPk}
              disabled={copiedPk}
              className="flex-1"
            >
              {copiedPk ? 'Copied!' : 'Copy PK'}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
