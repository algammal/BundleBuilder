import type { StepType } from "../types/common";

export interface ProductVariant {
    id: string;
    label: string;
    swatchColor?: string;
    thumbnail?: string;
    image?: string;
}
export interface Product {
    id: string;
    step: StepType;
    title: string;
    description?: string;
    image: string;

    price: number;
    compareAtPrice?: number;

    badge?: string;
    learnMoreUrl?: string;

    variants?: ProductVariant[];
}
export interface BundleStep {
    id: StepType;
    order: number;
    title: string;
    icon: string;
    nextStepLabel?: string;
    products: Product[];
}

export interface BundleConfigResponse {
    steps: BundleStep[];
}