import { apiFetch } from "./client";
import { ApiError } from "./errors";
import type { BundleConfigResponse } from "./types";

export async function getBundleConfig(): Promise<BundleConfigResponse> {
    try {
        return await apiFetch<BundleConfigResponse>("/api/bundle");
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 404) {
                throw new ApiError("Bundle configuration not found", 404);
            }

            if (error.status === 500) {
                throw new ApiError("Server error while loading bundle", 500);
            }
        }

        throw new ApiError("Unable to load bundle configuration");
    }
}