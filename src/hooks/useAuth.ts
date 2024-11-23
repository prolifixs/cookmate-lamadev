'use client'

import { useSession, signIn, signOut } from "next-auth/react"

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const useAuth = () => {
  const { data: session, status } = useSession()

  return {
    user: session?.user as User,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    signIn: () => signIn("google"),
    signOut: () => signOut(),
  }
}