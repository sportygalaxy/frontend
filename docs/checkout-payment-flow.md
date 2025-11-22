# Checkout Amounts and Payment Flow

How checkout totals are built, split, and sent to Paystack.

## Amount Definitions
- **Cart total (`cartTotal`)**: Sum of item totals from `showTotalPriceInCart(cart)` (base price plus variant options, multiplied by qty).
- **Shipping fee (`shippingFeeAmount`)**: `showShippingFeePrice(cartTotal, stateOrDefault)`, where `stateOrDefault` is the selected state or the default `SHIPPING_FEE` (5%). State rules live in `helpers/cart.ts`.
- **Checkout amount (`checkoutAmount`)**: `cartTotal + shippingFeeAmount` via `showTotalPrice`.
- **Payment amount (`paymentAmount`)**:
  - FULL: `checkoutAmount`
  - PARTIAL: `(checkoutAmount * PARTIAL_PAYMENT_DISCOUNT) / 100` (30% by default)

## Flow in Checkout UI (`app/(main)/checkout/page.tsx`)
1) User enters address, state, contact, and chooses payment option (FULL or 30% Down Payment).  
2) `computeCheckoutAmounts(state)` derives `shippingFeeAmount`, `checkoutAmount`, `paymentAmount`, and `isAllowedToCheckoutOut` (checks `MINIMUM_CHECKOUT_AMOUNT` of ₦30,000).  
3) UI shows:  
   - Total amount (checkoutAmount formatted)  
   - Shipping total (`CartSummaryPrice` uses `showShippingFeePrice` with state)  
   - Amount to Pay (paymentAmount, adjusted for partial payments)  
4) Payment buttons are disabled if minimum checkout fails or form is incomplete.

## Paystack Initiation (`components/PaystackPaymentUi.tsx`)
- Uses `amount: paymentAmount` (normalized and sent in kobo), currency `NGN`, and the user’s email.
- `metadata` includes items, offlineUser details, paymentOption, amountToPay, shippingFee, shippingState, and checkoutAmount.
- Backend initiation endpoint: `POST /payments/process` (see `services/paymentService.ts`).
- On success callback:
  1. Verifies with Paystack (`/transaction/verify/{reference}`)
  2. Verifies with backend (`/payments/finalize`)
  3. On double success, submits the order payload to `/orders`.

## Edge Cases
- No state selected: shipping uses default percentage (`SHIPPING_FEE` = 5%).
- Partial payments: only the discounted amount is charged; metadata still carries the full checkout totals.
- Minimum checkout: payment/UI disabled when `checkoutAmount < MINIMUM_CHECKOUT_AMOUNT`.

## Key Source Files
- `helpers/cart.ts` — shipping rules, total and shipping calculators.
- `app/(main)/checkout/page.tsx` — form, validation, amount derivation, payment wiring.
- `components/PaystackPaymentUi.tsx` — Paystack script loader and charge initiation.
- `services/paymentService.ts` — backend payment initiation/finalization calls.
