import React from "react";


interface AccordionProps {
    stepNumber: number;
    totalSteps: number;
    title: string;
    icon: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    onNext?: () => void;
    nextLabel?: string;
    selectedCount: number;
    children: React.ReactNode;
    hideTopBorder?: boolean;
}

export function Accordion({
    stepNumber,
    totalSteps,
    title,
    icon,
    isOpen,
    onToggle,
    onNext,
    nextLabel,
    selectedCount,
    children,
    hideTopBorder = false,
}: AccordionProps) {
    return (
        <div className={`py-[15px]
    ${hideTopBorder || isOpen
                ? "border-t-0"
                : "border-t border-gray-200"
            }
    ${isOpen ? "rounded-[10px] primary-bg-color" : "last:border-b last:border-gray-200"}`}>
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full flex-col text-left"
            >
                <div className="pb-[5px] pr-[15px] pl-[15px] text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200 last:border">
                    STEP {stepNumber} OF {totalSteps}
                </div>
                <div className={`flex w-full items-center justify-between p-[15px] ${!isOpen ? "pb-[0px]" : ""}`}>
                    <div className="flex items-center gap-3">
                        <div className="text-gray-400">{icon}</div>
                        <h2 className="text-xl font-normal text-[22px] text-gray-900">{title}</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        {selectedCount > 0 && (
                            <span className="text-sm font-medium text-[#5034E5]">
                                {selectedCount} selected
                            </span>
                        )}
                        {isOpen ? (
                            <span onClick={(e) => { e.stopPropagation(); onToggle(); }} className="text-[12px] text-[#4E2FD2]">▲</span>
                        ) : (
                            <span onClick={(e) => { e.stopPropagation(); onToggle(); }} className="text-[12px] text-[#4E2FD2]">▼</span>
                        )}
                    </div>
                </div>
            </button>

            {isOpen && (
                <div className="pr-[15px] pl-[15px]">
                    <div className="mb-8">{children}</div>
                    {onNext && nextLabel && (
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={onNext}
                                className="rounded-full border border-[#5034E5] px-6 py-2.5 text-sm font-semibold text-[#5034E5] hover:bg-[#5034E5] hover:text-white transition-colors"
                            >
                                Next: {nextLabel}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
