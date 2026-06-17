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