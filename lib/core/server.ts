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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
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

  const responseText = await res.text()
  let responseData: unknown = {}

  if (responseText) {
    try {
      responseData = JSON.parse(responseText)
    } catch {
      if (!res.ok) {
        throw new Error(responseText || `Request failed (${res.status})`)
      }
      throw new Error("The server returned an invalid response.")
    }
  }

  if (!res.ok) {
    const message =
      isRecord(responseData) &&
      typeof responseData.message === "string"
        ? responseData.message
        : `Request failed (${res.status})`
    throw new Error(message)
  }

  if (!isRecord(responseData)) {
    throw new Error("The server returned an invalid response.")
  }

  return responseData
}

export const requireRole = async (role: string) => {
  const session = await getSession()

  if (!session || session.user.role !== role) {
    redirect("/unauthorized")
  }
  return session
}
