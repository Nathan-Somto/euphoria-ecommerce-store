import NextAuth from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import { Role } from "@prisma/client"
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      profilePhoto: string
      role: Role
      username: string
      isEmailVerified: boolean
      isOAuth: boolean
      name: string
    }
  }
}
declare module "next-auth/adapters" {
  export interface AdapterUser {
    username: string
    name: string
    id: string
    image: string | null
    isEmailVerified: boolean
    email: string
    role: Role
  }
}