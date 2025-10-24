export interface DonationProduct {
  id: string
  name: string
  description: string
  priceInCents: number
  shelterId: number
  shelterName: string
}

// Quick donate amounts
export const QUICK_DONATE_AMOUNTS = [25, 50, 100, 250]

// Create a donation product
export function createDonationProduct(
  shelterId: number,
  shelterName: string,
  amountInDollars: number,
): DonationProduct {
  return {
    id: `donation-${shelterId}-${amountInDollars}`,
    name: `Donation to ${shelterName}`,
    description: `Support ${shelterName} with a $${amountInDollars} donation`,
    priceInCents: amountInDollars * 100,
    shelterId,
    shelterName,
  }
}
