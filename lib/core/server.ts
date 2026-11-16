"use server"
import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

export const getToken = async () => {
  const session = await getSession()
  if (!session || !session.session?.token) {
    redirect("/unauthorized")
  }
  return session.session.token
}

export const authFetch = async (api: string) => {
  const token = await getToken()
  const res = await fetch(api, {
    headers: { authorization: `Bearer ${token}` },
  })
  return res
}

export const protectionMutation = async (
  api: string,
  method: string,
  data?: string
) => {
  const token = await getToken()
  const res = await fetch(api, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: data ?? null,
  })
  if (res.status === 401 || res.status === 403) {
    redirect("/unauthorized")
  }

  return res
}

export const requireRole = async (role: string) => {
  const session = await getSession()

  if (!session || session.user.role !== role) {
    redirect("/unauthorized")
  }
  return session
}
