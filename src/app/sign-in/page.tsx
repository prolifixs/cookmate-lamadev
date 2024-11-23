import { getProviders } from "next-auth/react"
import SignInComponent from "./SignInComponent"

export default async function SignIn() {
  const providers = await getProviders()

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <SignInComponent providers={providers} />
      </div>
    </div>
  )
} 