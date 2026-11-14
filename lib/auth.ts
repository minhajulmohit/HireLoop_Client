import { betterAuth } from "better-auth"

import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { admin } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URL as string)
const db = client.db("hireloopdb")

export const auth = betterAuth({
plugins:[admin(),],

  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: true,
        defaultValue: "seeker",
        enum: ["seeker", "recruiter", "admin"],
      }, // allowed: seeker, recruiter, admin
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
})
