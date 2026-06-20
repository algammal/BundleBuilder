import {
    createContext,
    useContext,
    useReducer,
    useEffect,
} from "react";

import { bundleReducer } from "./bundleReducer";
import { initialState } from "./initialState";
import type { BundleAction } from "./bundleActions";

import type {
    BundleState,
} from "./types";

interface BundleContextValue {
    state: BundleState;

    dispatch:
    React.Dispatch<BundleAction>;
}

const BundleContext =
    createContext<BundleContextValue | null>(
        null
    );

export function BundleProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, dispatch] = useReducer(
        bundleReducer,
        initialState
    );
    useEffect(() => {
        const savedState = localStorage.getItem("bundleState");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                dispatch({ type: "RESTORE_STATE", payload: parsed });
            } catch (e) {
                console.error("Failed to parse saved state", e);
            }
        } else {
            dispatch({ type: "SET_QUANTITY", payload: { productId: "cam-unlimited", variantId: "default", quantity: 1 } });
            dispatch({ type: "SET_QUANTITY", payload: { productId: "sense-motion", variantId: "default", quantity: 2 } });
            dispatch({ type: "SET_QUANTITY", payload: { productId: "sense-hub", variantId: "default", quantity: 1 } });
            dispatch({ type: "SET_QUANTITY", payload: { productId: "microsd-256", variantId: "default", quantity: 2 } });
        }
    }, []);

    return (
        <BundleContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </BundleContext.Provider>
    );
}

export function useBundleStore() {
    const context =
        useContext(BundleContext);

    if (!context) {
        throw new Error(
            "useBundleStore must be used inside BundleProvider"
        );
    }

    return context;
}