import type { BundleState, ProductSelection } from "./types";

export function getActiveStep(
  state: BundleState
): number {
  return state.activeStep;
}
export function getProductSelection(
  state: BundleState,
  productId: string
): ProductSelection | undefined {
  return state.selections[productId];
}
export function getSelectedVariant(
  state: BundleState,
  productId: string
): string | undefined {
  return state.selections[productId]?.selectedVariantId;
}
export function getVariantQuantity(
  state: BundleState,
  productId: string,
  variantId: string
): number {
  return (
    state.selections[productId]
      ?.variantQuantities[variantId] ?? 0
  );
}
export function getTotalSelectedProducts(
  state: BundleState
): number {
  return Object.keys(state.selections).length;
}
