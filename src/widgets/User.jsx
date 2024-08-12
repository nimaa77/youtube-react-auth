import {
  useState,
  useEffect,
} from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { client } from "@/lib/client"

export default function User() {
  const [user, setUser] = useState()

  useEffect(() => {
    client("/api/v1/me")
      .then((res) => res.json())
      .then(setUser)
  }, [])

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Welcome, {user.name}!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Your email is {user.email}
        </p>
      </CardContent>
    </Card>
  )
}
