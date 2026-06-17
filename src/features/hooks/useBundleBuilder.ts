import { useEffect, useState } from "react";
import { getBundleConfig } from "../../api/bundleApi";
import type { BundleConfigResponse } from "../../api/types";

export function useBundleConfig() {
    const [data, setData] = useState<BundleConfigResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchBundle() {
        try {
            setLoading(true);
            setError(null);

            const response = await getBundleConfig();
            setData(response);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBundle();
    }, []);

    return {
        data,
        loading,
        error,
        refetch: fetchBundle,
    };
}