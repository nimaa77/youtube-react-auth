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

export default function Orders() {
  const [orders, setOrders] = useState()

  useEffect(() => {
    client("/api/v1/orders")
      .then((res) => res.json())
      .then((res) =>
        setOrders(res.data)
      )
  }, [])

  if (!orders) {
    return <p>Loading...</p>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Your Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-row items-center justify-between space-x-2 max-w-xl"
          >
            <p>{order.title}</p>
            <p>
              {order.price.toLocaleString(
                "en-us",
                {
                  currency: "USD",
                }
              )}
            </p>
            <p>{order.status}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
