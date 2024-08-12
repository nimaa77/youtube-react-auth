import { useState } from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { setIsLoggedIn } from "@/utils/flags"

export function UserAuthForm({
  className,
  ...props
}) {
  const [isLoading, setIsLoading] =
    useState(false)
  const navigate = useNavigate()

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    const res = await fetch(
      "/api/v1/auth/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          Object.fromEntries(
            new FormData(event.target)
          )
        ),
      }
    )
    setIsLoading(false)

    if (!res.ok) {
      toast.error(
        "Invalid email or password"
      )
      return
    }

    toast.success(
      "Logged in successfully"
    )
    navigate("/dashboard")
    setIsLoggedIn(true)
  }

  return (
    <div
      className={cn(
        "grid gap-6",
        className
      )}
      {...props}
    >
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label
              className="sr-only"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label
              className="sr-only"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}
