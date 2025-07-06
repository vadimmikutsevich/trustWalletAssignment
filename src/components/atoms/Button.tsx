import clsx from 'clsx'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({
  variant = 'primary',
  disabled,
  className,
  ...rest
}: Props) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition',
        variant === 'primary' && [
          'bg-sky-blue text-white',
          disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-royal-blue',
        ],
        variant === 'secondary' && [
          'border text-gray-600',
          disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50',
        ],
        className,
      )}
      {...rest}
    />
  )
}
