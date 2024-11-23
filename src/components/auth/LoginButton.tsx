'use client'

import { useAuth } from "@/hooks/useAuth"

export default function LoginButton() {
  const { user, isAuthenticated, signIn, signOut } = useAuth()

  if (isAuthenticated) {
    return (
      <button 
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    )
  }

  return (
    <button 
      onClick={() => signIn()}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Login with Google
    </button>
  )
} 