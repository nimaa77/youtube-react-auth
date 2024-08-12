import memoize from "memoizee"

import { setIsLoggedIn } from "@/utils/flags"

export async function client(
  input,
  init
) {
  const isExpired = isTokenExpired()

  if (isExpired) {
    await refreshToken()
  }

  return fetch(input, init)
}

async function sendRefreshTokenRequest() {
  const res = await fetch(
    "/api/v1/refresh-token",
    {
      method: "POST",
    }
  )

  if (res.status === 401) {
    setIsLoggedIn(false)
    window.location.href = "/login"
  }
}

const refreshToken = memoize(
  sendRefreshTokenRequest,
  {
    promise: true,
    maxAge: 5_000,
  }
)

function isTokenExpired() {
  const cookie = document.cookie
    .split(";")
    .find((cookie) =>
      cookie.includes(
        "accessToken_expires"
      )
    )

  if (!cookie) {
    return true
  }

  const expires = cookie.split("=")[1]

  if (Date.now() > expires) {
    return true
  }

  return false
}
