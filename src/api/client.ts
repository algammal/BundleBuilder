import { ApiError } from "./errors";

export async function apiFetch<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new ApiError(
                `Request failed with status ${response.status}`,
                response.status
            );
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError("Network error");
    }
}