import type {
    BundleState,
} from "./types";
import type { BundleAction } from "./bundleActions";
import { initialState } from "./initialState";

export function bundleReducer(
    state: BundleState,
    action: BundleAction
): BundleState {
    switch (action.type) {
        case "SET_ACTIVE_STEP":
            return {
                ...state,
                activeStep: action.payload,
            };

        case "SELECT_VARIANT":
            return handleSelectVariant(state, action);

        case "SET_QUANTITY":
            return handleSetQuantity(state, action);

        case "RESTORE_STATE":
            return action.payload;

        case "RESET_STATE":
            return initialState;

        default:
            return state;
    }
}
function handleSelectVariant(
    state: BundleState,
    action: Extract<BundleAction, { type: "SELECT_VARIANT" }>
): BundleState {
    const { productId, variantId } = action.payload;

    const existing = state.selections[productId];

    return {
        ...state,
        selections: {
            ...state.selections,
            [productId]: {
                productId,
                selectedVariantId: variantId,
                variantQuantities:
                    existing?.variantQuantities ?? {},
            },
        },
    };
}

function handleSetQuantity(
    state: BundleState,
    action: Extract<BundleAction, { type: "SET_QUANTITY" }>
): BundleState {
    const { productId, variantId, quantity } =
        action.payload;

    const existing = state.selections[productId];

    return {
        ...state,
        selections: {
            ...state.selections,
            [productId]: {
                productId,
                selectedVariantId:
                    existing?.selectedVariantId ??
                    variantId,
                variantQuantities: {
                    ...(existing?.variantQuantities ?? {}),
                    [variantId]: Math.max(0, quantity),
                },
            },
        },
    };
}
