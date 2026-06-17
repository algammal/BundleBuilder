import {
    createContext,
    useContext,
    useReducer,
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