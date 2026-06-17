import { PageContainer } from "./PageContainer";
import { TwoColumnLayout } from "./TwoColumnLayout";

export function BuilderLayout() {
    return (
        <PageContainer>
            <TwoColumnLayout
                left={
                    <div className="rounded-2xl border p-6">
                        Builder Area
                    </div>
                }
                right={
                    <div className="rounded-2xl border p-6">
                        Review Panel
                    </div>
                }
            />
        </PageContainer>
    );
}