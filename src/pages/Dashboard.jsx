import User from "@/widgets/User"
import Orders from "@/widgets/Orders"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <User />
      <Orders />
    </div>
  )
}
