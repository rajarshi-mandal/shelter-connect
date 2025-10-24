"use server"

import { stripe } from "@/lib/stripe"

export async function startDonationCheckout(shelterName: string, amountInDollars: number) {
  if (amountInDollars <= 0) {
    throw new Error("Donation amount must be greater than 0")
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Donation to ${shelterName}`,
            description: `Support ${shelterName} with your generous donation`,
          },
          unit_amount: amountInDollars * 100, // Cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  })

  return session.client_secret
}
