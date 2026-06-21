function MinusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
    );
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
}

interface StepperProps {
    value: number;
    onChange: (newValue: number) => void;
    min?: number;
    max?: number;
    isPannel?: boolean;
}

export function Stepper({ value, onChange, min = 0, max = 99, isPannel = false }: StepperProps) {
    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                disabled={value <= min}
                onClick={() => onChange(value - 1)}
                className={`flex h-8 w-8 items-center justify-center rounded border ${isPannel ? 'bg-[#ffff] border-[#ffff]' : 'bg-[#F0F4F7] border-[#F0F4F7]'} text-[#1F1F1F] disabled:text-[#E6EBF0] disabled:border-[#E6EBF0] disabled:bg-transparent`}
            >
                <MinusIcon className="h-4 w-4" />
            </button>
            <span className="min-w-[1ch] text-center text-sm font-semibold text-gray-900">
                {value}
            </span>
            <button
                type="button"
                disabled={value >= max}
                onClick={() => onChange(value + 1)}
                className={`flex h-8 w-8 items-center justify-center rounded border ${isPannel ? 'bg-[#ffff] border-[#ffff]' : 'bg-[#F0F4F7] border-[#F0F4F7]'} text-[#1F1F1F] disabled:text-[#E6EBF0] disabled:border-[#E6EBF0] disabled:bg-transparent`}
            >
                <PlusIcon className="h-4 w-4" />
            </button>
        </div>
    );
}
