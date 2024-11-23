'use client'

import { signIn } from "next-auth/react"

export default function SignInComponent({ providers }: any) {
  return (
    <div>
      {Object.values(providers || {}).map((provider: any) => (
        <div key={provider.name} className="flex justify-center">
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-md border hover:bg-gray-50"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
} 