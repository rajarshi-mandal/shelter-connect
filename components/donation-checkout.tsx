"use client"

import { useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startDonationCheckout } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface DonationCheckoutProps {
  shelterName: string
  amount: number
}

export default function DonationCheckout({ shelterName, amount }: DonationCheckoutProps) {
  const startCheckout = useCallback(() => startDonationCheckout(shelterName, amount), [shelterName, amount])

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret: startCheckout }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
