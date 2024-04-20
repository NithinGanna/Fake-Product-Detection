import React from 'react'
import { DollarSign, Zap, Moon, Filter } from 'lucide-react'

export function FeaturesLandingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto inline-flex rounded-full bg-gray-100 px-4 py-1.5">
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
  <div>
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
      <DollarSign className="h-9 w-9 text-gray-700" />
    </div>
    <h3 className="mt-8 text-lg font-semibold text-black">Authenticity Assurance</h3>
    <p className="mt-4 text-sm text-gray-600">
      Ensure secure transactions and protect against counterfeit products with our blockchain-based authentication system.
    </p>
  </div>
  <div>
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
      <Zap className="h-9 w-9 text-gray-700" />
    </div>
    <h3 className="mt-8 text-lg font-semibold text-black">Instant Alerts</h3>
    <p className="mt-4 text-sm text-gray-600">
      Receive real-time notifications for product expiry dates, ensuring you stay informed and make timely decisions.
    </p>
  </div>
  <div>
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
      <Moon className="h-9 w-9 text-gray-700" />
    </div>
    <h3 className="mt-8 text-lg font-semibold text-black">Customizable Themes</h3>
    <p className="mt-4 text-sm text-gray-600">
      Personalize your experience with light and dark mode options, catering to your preferences and enhancing readability.
    </p>
  </div>
  <div>
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
      <Filter className="h-9 w-9 text-gray-700" />
    </div>
    <h3 className="mt-8 text-lg font-semibold text-black">Streamlined Navigation</h3>
    <p className="mt-4 text-sm text-gray-600">
      Easily filter and access relevant information with our intuitive interface, ensuring a seamless user experience.
    </p>
  </div>
</div>

    </div>
  )
}
