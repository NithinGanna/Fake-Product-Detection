import React from 'react'

export function FAQLandingPage() {
  return (
    <section className="mx-auto max-w-7xl px-2 py-10 md:px-0">
  <div>
    <div className="mx-auto max-w-2xl lg:text-center">
      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
        Have a question about our services? Find answers to some of the most common queries below.
      </p>
    </div>
    <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
      <div>
        <h2 className="text-xl font-semibold text-black">How do I create an account?</h2>
        <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
          To create an account, simply click on the "Sign Up" button located at the top right corner
          of the page. Fill in the required information, verify your email address, and you're all
          set to access our platform's features.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-black">How can I reset my password?</h2>
        <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
          If you've forgotten your password, click on the "Forgot Password?" link on the login page.
          Enter your email address and follow the instructions sent to your inbox to reset your
          password securely.
        </p>
      </div>
    </div>
    <p className="mt-10 text-center text-gray-600">
      Still have questions? Feel free to{' '}
      <a href="#" title="" className="black font-semibold hover:underline">
        reach out to our support team
      </a>{' '}
      for assistance.
    </p>
  </div>
</section>

  )
}
