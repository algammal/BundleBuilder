import type { BundleState } from "./types";

export type BundleAction =
    | {
        type: "SET_ACTIVE_STEP";
        payload: number;
    }
    | {
        type: "SELECT_VARIANT";
        payload: {
            productId: string;
            variantId: string;
        };
    }
    | {
        type: "SET_QUANTITY";
        payload: {
            productId: string;
            variantId?: string;
            quantity: number;
        };
    }
    | {
        type: "RESTORE_STATE";
        payload: BundleState;
    }
    | {
        type: "RESET_STATE";
    };