export function accumulateAmounts(amounts: number[]): number {
  return amounts.reduce((total, amount) => total + (amount || 0), 0); // Ensure no NaN values are included
}
