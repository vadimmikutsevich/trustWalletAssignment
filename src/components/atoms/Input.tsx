interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: Props) {
  return (
    <input
      {...props}
      className={
        'w-full rounded-md border px-3 py-2 outline-none focus:border-royal-blue ' +
        props.className
      }
    />
  )
}
