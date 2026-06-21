import { Badge } from "./Badge";
import { Price } from "./Price";
import { Stepper } from "./Stepper";
import { imageMap } from "../../assets/images/images";

export interface VariantOption {
    id: string;
    label: string;
    swatchColor?: string;
    image?: string;
}

interface ProductCardProps {
    id: string;
    title: string;
    description?: string;
    image: string;
    price: number;
    compareAtPrice?: number;
    badge?: string;
    learnMoreUrl?: string;
    variants?: VariantOption[];

    selectedVariantId?: string;
    onVariantSelect?: (variantId: string) => void;

    quantity: number;
    onQuantityChange: (qty: number) => void;
}

export function ProductCard({
    title,
    description,
    image,
    price,
    compareAtPrice,
    badge,
    learnMoreUrl,
    variants,
    selectedVariantId,
    onVariantSelect,
    quantity,
    onQuantityChange,
}: ProductCardProps) {
    const isSelected = quantity > 0;

    return (
        <div
            className={`relative flex flex-col rounded-xl border p-2 transition-colors xs:p-6 ${isSelected ? "border-[#5034E5] bg-white shadow-sm ring-1 ring-[#4E2FD2B2]" : "border-[#ffff] bg-white"
                }`}
        >
            {badge && (
                <div className="absolute top-4 left-4 z-10">
                    <Badge>{badge}</Badge>
                </div>
            )}

            <div className="flex flex-col md:flex-col xl:flex-row sm:gap-6">
                <div className="flex h-32 w-full shrink-0 items-center justify-center sm:h-32 sm:w-32 rounded-lg">
                    {image ? (
                        <img src={imageMap[image]} alt={title} className="max-h-full max-w-full object-contain p-2" />
                    ) : (
                        <div className="h-16 w-16 bg-gray-200 rounded"></div>
                    )}
                </div>

                <div className="flex flex-1 flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-start gap-4">
                            <h3 className="text-[16px] font-medium text-[#1F1F1F]">
                                {title === "Cam Unlimited" ? (
                                    <>Cam <span className="text-[#4E2FD2]">Unlimited</span></>
                                ) : (
                                    title
                                )}
                            </h3>
                        </div>

                        {description && (
                            <p className="text-sm text-[#1F1F1FBF] text-[12px]">{description}</p>
                        )}

                        {learnMoreUrl && (
                            <a href={learnMoreUrl} className="text-sm font-medium text-[#5034E5] hover:underline mb-[10px]">
                                Learn More
                            </a>
                        )}
                    </div>

                    {variants && variants.length > 0 && (
                        <div className="flex mb-[10px] md:flex-wrap sm:flex-nowrap">
                            {variants.map(variant => (
                                <button
                                    key={variant.id}
                                    type="button"
                                    onClick={() => onVariantSelect?.(variant.id)}
                                    className={`mr-[5px] flex items-center gap-2 rounded-[2px] px-2.5 py-1 text-xs font-medium border ${selectedVariantId === variant.id
                                        ? "border-[#0AA288] ring-0.5 ring-[#0AA288] bg-[#1DF0BB0A]"
                                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                                        }`}
                                >
                                    {variant.image ? (
                                        <img src={imageMap[variant.image] || variant.image} alt={variant.label} className="h-5 w-5 object-contain" />
                                    ) : variant.swatchColor ? (
                                        <span
                                            className="h-3 w-3 rounded-full border border-gray-200"
                                            style={{ backgroundColor: variant.swatchColor }}
                                        />
                                    ) : null}
                                    {variant.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-auto">
                        <Stepper value={quantity} onChange={onQuantityChange} />
                        <Price price={price} compareAtPrice={compareAtPrice} />
                    </div>
                </div>
            </div>
        </div>
    );
}
