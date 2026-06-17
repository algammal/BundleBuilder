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
        type: "INCREMENT_QUANTITY";
        payload: {
            productId: string;
        };
    }
    | {
        type: "DECREMENT_QUANTITY";
        payload: {
            productId: string;
        };
    }
    | {
        type: "RESTORE_STATE";
        payload: BundleState;
    };