import type { StepType } from "./common";

export interface ProductSelection {
    productId: string;
    selectedVariantId?: string;
    variantQuantities: Record<string, number>;
    quantity?: number;
}

export interface BundleState {
    activeStep: number;
    selections: Record<string, ProductSelection>;
}
export interface ReviewItem {
    productId: string;
    title: string;
    image: string;
    quantity: number;
    unitPrice: number;

    variantLabel?: string;
    step: StepType;
}