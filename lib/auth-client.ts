import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"
import { adminClient } from "better-auth/client/plugins"
import { adminAc, userAc } from "better-auth/plugins/admin/access"

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({
      roles: {
        admin: adminAc,
        recruiter: userAc,
        seeker: userAc,
      },
    }),
  ],
})

export const { signIn, signUp, signOut, useSession } = authClient
