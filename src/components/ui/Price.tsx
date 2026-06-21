interface PriceProps {
    price: number;
    compareAtPrice?: number;
    className?: string;
}

export function Price({ price, compareAtPrice, className = "" }: PriceProps) {
    return (
        <div className={`flex flex-col items-end leading-tight ${className}`}>
            {compareAtPrice !== undefined && compareAtPrice > price && (
                <span className="text-sm text-[#D8392B] text-[16px] line-through decoration-red-500/50">
                    ${compareAtPrice.toFixed(2)}
                </span>
            )}
            <span
                className={`text-base font-semibold text-[16px] text-[#575757]`}
            >
                ${price.toFixed(2)}
            </span>
        </div>
    );
}
