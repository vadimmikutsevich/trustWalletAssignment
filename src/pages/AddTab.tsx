import { CreateForm } from '../components/organisms/CreateForm'

export function AddTab() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Create wallet</h2>
      <CreateForm />
    </div>
  )
}
