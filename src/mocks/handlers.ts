import { http, HttpResponse } from "msw";
import bundleData from "./data/bundleData.json";

export const handlers = [
    http.get("/api/bundle", async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        return HttpResponse.json(bundleData);
    }),
];