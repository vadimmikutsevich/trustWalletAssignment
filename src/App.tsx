import { BottomNav } from './components/templates/BottomNav'

export default function App() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 p-4 font-sans">
      <div className="w-[375px] max-w-full h-[667px] bg-white rounded-2xl shadow-lg overflow-hidden">
        <BottomNav />
      </div>
    </div>
  )
}
