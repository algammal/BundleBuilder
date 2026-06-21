export function Badge({ children }: { children: React.ReactNode }) {
    if (!children) return null;
    return (
        <span className="inline-flex items-center rounded-full bg-[#4E2FD2] px-2.5 py-0.5 text-xs font-semibold text-white">
            {children}
        </span>
    );
}
