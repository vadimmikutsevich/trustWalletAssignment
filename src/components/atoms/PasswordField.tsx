import { useState } from 'react'
import { Input } from './Input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function PasswordField({ label, className, ...rest }: Props) {
  const [show, setShow] = useState(false)

  return (
    <label className="block">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="relative">
        <Input
          type={show ? 'text' : 'password'}
          {...rest}
          className={'mt-1 pr-10 ' + className}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
        >
          {show ? '🙈' : '👁'}
        </button>
      </div>
    </label>
  )
}
