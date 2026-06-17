import type { StepType } from "./common";

export interface ProductVariant {
    id: string;
    label: string;
    swatchColor?: string;
    thumbnail?: string;
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
    variants?: ProductVariant[];
}