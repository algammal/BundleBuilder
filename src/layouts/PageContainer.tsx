type PageContainerProps = {
    children: React.ReactNode;
};

export function PageContainer({
    children,
}: PageContainerProps) {
    return (
        <div className="mx-auto w-full max-w-[1440px] px-0 md:px-6 lg:px-8">
            {children}
        </div>
    );
}