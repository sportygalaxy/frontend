# Delivery / Shipping Fee Breakdown (Per State)

Sporty Galaxy applies shipping fees as a percentage of the cart total, using the customer’s selected Nigerian state. Rates are tiered by order value:

- Under ₦100,000
- Under ₦300,000
- Under ₦1,000,000
- Under ₦15,000,000
- ₦15,000,000 and above

## State-by-State Rates (% of cart total)

| State (Capital)          | <100k | <300k | <1m | <15m | ≥15m |
| ------------------------ | ----- | ----- | --- | ---- | ---- |
| Abia (Umuahia)           | 10%   | 7%    | 5%  | 8%   | 10%  |
| Adamawa (Yola)           | 12%   | 10%   | 8%  | 10%  | 12%  |
| Akwa Ibom (Uyo)          | 10%   | 8%    | 7%  | 9%   | 11%  |
| Anambra (Awka)           | 10%   | 7%    | 5%  | 8%   | 10%  |
| Bauchi (Bauchi)          | 12%   | 9%    | 8%  | 11%  | 12%  |
| Bayelsa (Yenagoa)        | 10%   | 8%    | 7%  | 10%  | 11%  |
| Benue (Makurdi)          | 12%   | 9%    | 8%  | 11%  | 12%  |
| Borno (Maiduguri)        | 12%   | 9%    | 8%  | 11%  | 12%  |
| Cross River (Calabar)    | 10%   | 8%    | 7%  | 10%  | 12%  |
| Delta (Asaba)            | 10%   | 7%    | 5%  | 8%   | 10%  |
| Ebonyi (Abakaliki)       | 10%   | 7%    | 5%  | 8%   | 10%  |
| Edo (Benin City)         | 10%   | 7%    | 5%  | 8%   | 10%  |
| Ekiti (Ado-Ekiti)        | 8%    | 5%    | 5%  | 8%   | 10%  |
| Enugu (Enugu)            | 10%   | 7%    | 5%  | 8%   | 10%  |
| Gombe (Gombe)            | 12%   | 9%    | 8%  | 11%  | 12%  |
| Imo (Owerri)             | 10%   | 7%    | 5%  | 8%   | 10%  |
| Jigawa (Dutse)           | 12%   | 9%    | 8%  | 11%  | 12%  |
| Kaduna (Kaduna)          | 12%   | 9%    | 8%  | 11%  | 12%  |
| Kano (Kano)              | 12%   | 9%    | 8%  | 11%  | 12%  |
| Katsina (Katsina)        | 12%   | 9%    | 8%  | 11%  | 12%  |
| Kebbi (Birnin Kebbi)     | 12%   | 9%    | 8%  | 11%  | 12%  |
| Kogi (Lokoja)            | 12%   | 9%    | 8%  | 11%  | 12%  |
| Kwara (Ilorin)           | 8%    | 5%    | 5%  | 8%   | 10%  |
| Lagos (Ikeja)            | 6%    | 5%    | 5%  | 7%   | 8%   |
| Nasarawa (Lafia)         | 12%   | 9%    | 8%  | 11%  | 12%  |
| Niger (Minna)            | 12%   | 9%    | 8%  | 11%  | 12%  |
| Ogun (Abeokuta)          | 8%    | 5%    | 5%  | 8%   | 10%  |
| Ondo (Akure)             | 8%    | 5%    | 5%  | 8%   | 10%  |
| Osun (Osogbo)            | 8%    | 5%    | 5%  | 8%   | 10%  |
| Oyo (Ibadan)             | 8%    | 5%    | 5%  | 8%   | 10%  |
| Plateau (Jos)            | 12%   | 9%    | 8%  | 11%  | 12%  |
| Rivers (Port Harcourt)   | 10%   | 7%    | 5%  | 8%   | 10%  |
| Sokoto (Sokoto)          | 12%   | 9%    | 8%  | 11%  | 12%  |
| Taraba (Jalingo)         | 12%   | 9%    | 8%  | 11%  | 12%  |
| Yobe (Damaturu)          | 12%   | 9%    | 8%  | 11%  | 12%  |
| Zamfara (Gusau)          | 12%   | 9%    | 8%  | 11%  | 12%  |
| FCT (Abuja)              | 10%   | 7%    | 5%  | 8%   | 10%  |

## How it is applied in code

- The helper `showShippingFeePrice(total, shippingState)` applies the correct percentage for the state (or falls back to the default `SHIPPING_FEE` if no state is provided) and returns the absolute fee.
- Percentages are selected by the order total thresholds above; the fee is `total * (percentage / 100)`.
- State lookup is tolerant of labels like “Lagos State” or “FCT”.

Source of truth: `helpers/cart.ts` (state rules and calculation logic). The checkout page supplies the selected state to this helper to compute the shipping charge shown in order summaries and used at payment initiation.
