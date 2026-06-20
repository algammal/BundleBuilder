import { PageContainer } from "./PageContainer";
import { TwoColumnLayout } from "./TwoColumnLayout";
import { BuilderArea } from "../features/components/BuilderArea";
import { ReviewPanel } from "../features/components/ReviewPanel";
import { useBundleConfig } from "../features/hooks/useBundleBuilder";

export function BuilderLayout() {
    const { data, loading, error } = useBundleConfig();

    if (loading) {
        return <div className="p-12 text-center text-gray-500">Loading bundle builder...</div>;
    }

    if (error) {
        return <div className="p-12 text-center text-red-500">Error: {error}</div>;
    }

    if (!data) return null;

    return (
        <PageContainer>
            <TwoColumnLayout
                left={<BuilderArea steps={data.steps} />}
                right={<ReviewPanel steps={data.steps} />}
            />
        </PageContainer>
    );
}