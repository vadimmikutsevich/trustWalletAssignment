import { useState } from 'react'
import { nanoid } from 'nanoid'
import { Wallet } from 'ethers'
import { PasswordField } from '../atoms/PasswordField'
import { Button } from '../atoms/Button'
import { Spinner } from '../atoms/Spinner'
import { useWalletStore } from '../../store/walletStore'

export function CreateForm() {
  const addWallet = useWalletStore((s) => s.addWallet)

  const [password, setPw] = useState('')
  const [confirm, setCf] = useState('')
  const [error, setErr] = useState('')
  const [loading, setLoad] = useState(false)
  const [created, setOk] = useState(false)

  const valid = password.length >= 8 && password === confirm

  const handleGenerate = async () => {
    if (!valid) {
      setErr('Passwords must match and be ≥ 8 chars')
      return
    }
    setErr('')
    setLoad(true)

    try {
      const wallet = Wallet.createRandom()
      const jsonPk = await wallet.encrypt(password)

      addWallet({
        id: nanoid(),
        address: wallet.address as `0x${string}`,
        jsonPk,
      })

      setPw('')
      setCf('')
      setOk(true)
      setTimeout(() => setOk(false), 500)
    } catch {
      setErr('Failed to generate wallet')
    } finally {
      setLoad(false)
    }
  }

  return (
    <div className="space-y-4">
      <PasswordField
        label="Password"
        value={password}
        onChange={(e) => setPw(e.target.value)}
      />
      <PasswordField
        label="Confirm"
        value={confirm}
        onChange={(e) => setCf(e.target.value)}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        type="button"
        onClick={handleGenerate}
        disabled={loading || created}
        className="w-full flex items-center justify-center gap-2"
      >
        {loading && <Spinner />}
        {created ? 'Created!' : 'Generate wallet'}
      </Button>
    </div>
  )
}
