import { PasswordField } from '../atoms/PasswordField'
import { Button } from '../atoms/Button'

export function CreateForm() {
  return (
    <form className="space-y-4">
      <PasswordField label="Password" name="password" />
      <PasswordField label="Confirm" name="confirm" />

      <Button type="button" disabled className="w-full">
        Generate wallet
      </Button>
    </form>
  )
}
