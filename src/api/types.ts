export interface ProductVariant {
    id: string;
    name: string;
    price: number;
    compareAt?: number;
}

export interface BundleStep {
    id: string;
    title: string;
    products: ProductVariant[];
}

export interface BundleConfigResponse {
    steps: BundleStep[];
}