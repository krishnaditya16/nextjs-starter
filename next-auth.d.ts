import { DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  role: string
  isTwoFactorEnabled: boolean
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
