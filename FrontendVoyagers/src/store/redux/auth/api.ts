import type { Credentials } from "./types"
export const fetchLogin = async (credentials: Credentials) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
  return res.json()
}
export const fetchLogout = async () => {
  const res = await fetch("/api/auth/logout", {
    headers: {
      accept: "*/*",
    },
  })
  return res.json()
}
export const fetchProfile = async () => {
  const res = await fetch("/api/auth/profile", {
    headers: {
      accept: "*/*",
    },
  })
  if (res.status > 400) {
    throw new Error("Unauthorized")
  }
  return res.json()
}
export const fetchRegister = async (credentials: Credentials) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
  return res.json()
}