type TwoColumnLayoutProps = {
    left: React.ReactNode;
    right: React.ReactNode;
};

export function TwoColumnLayout({
    left,
    right,
}: TwoColumnLayoutProps) {
    return (
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>{left}</div>

            <aside className="lg:sticky lg:top-6 h-fit">
                {right}
            </aside>
        </div>
    );
}