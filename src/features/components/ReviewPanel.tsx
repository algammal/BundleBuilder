import { useBundleStore } from "../store/bundleContext";
import { Stepper } from "../../components/ui/Stepper";
import type { BundleStep } from "../../api/types";
import { imageMap } from "../../assets/images/images";
import fastShippingIcon from "../../assets/icons/fastShipping.svg";
import satisfactionBadge from "../../assets/icons/satisfactionBadge.png";

export function ReviewPanel({ steps }: { steps: BundleStep[] }) {
    const { state, dispatch } = useBundleStore();
    let totalPreDiscount = 0;
    let total = 0;

    const selectedItemsByStep: Record<string, any[]> = {};

    steps.forEach(step => {
        selectedItemsByStep[step.id] = [];

        step.products.forEach(product => {
            const selection = state.selections[product.id];
            if (!selection) return;

            Object.entries(selection.variantQuantities).forEach(([variantId, qty]) => {
                if (qty > 0) {
                    const price = product.price;
                    const compareAt = product.compareAtPrice || price;

                    total += price * qty;
                    totalPreDiscount += compareAt * qty;

                    const variant = product.variants?.find(v => v.id === variantId);

                    selectedItemsByStep[step.id].push({
                        productId: product.id,
                        variantId: variantId,
                        title: product.title,
                        image: variant?.image || product.image,
                        variantLabel: variant?.label,
                        price,
                        compareAtPrice: product.compareAtPrice,
                        quantity: qty
                    });
                }
            });
        });
    });

    const savings = totalPreDiscount - total;

    const handleSaveForLater = () => {
        localStorage.setItem("bundleState", JSON.stringify(state));
        alert("Your system has been saved for later!");
    };

    return (
        <div className="flex flex-col rounded-[10px] bg-[#edf4ff]">
            <h3 className="text-xs font-semibold tracking-widest p-[15px] pb-0 text-[#484848] uppercase block md:hidden xl:block">REVIEW</h3>
            <div className="p-[20px] pt-[25px]">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-7">
                    <div className="flex flex-col gap-6 flex-1 overflow-y-auto mt-[15px]">
                        <div className="border-b border-[#CED6DE] md:border-0">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your security system</h2>
                            <p className="text-sm text-gray-600 mb-[10px]">
                                Review your personalized protection system designed to keep what matters most safe.
                            </p>
                        </div>
                        {steps.map(step => {
                            const items = selectedItemsByStep[step.id];
                            if (!items || items.length === 0) return null;

                            return (
                                <div key={step.id} className="border-b border-[#CED6DE] pb-2">
                                    <h4 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-[8px]">
                                        {step.id}
                                    </h4>
                                    <div className="flex flex-col gap-4">
                                        {items.map(item => (
                                            <div key={`${item.productId}-${item.variantId}`} className={`flex items-center ${step.id !== 'plan' ? 'gap-4' : null}`}>
                                                <div className={`h-12 w-12 shrink-0 rounded-md border border-gray-100 flex items-center justify-center p-1 ${step.id !== 'plan' ? 'bg-white' : null}`}>
                                                    {item.image ? (
                                                        <img src={imageMap[item.image] || item.image} alt={item.title} className="max-h-full object-contain" />
                                                    ) : (
                                                        <div className="h-8 w-8 bg-gray-100 rounded"></div>
                                                    )}
                                                </div>
                                                <div className="flex flex-1 flex-col">
                                                    <span className="text-sm font-semibold text-gray-900">
                                                        {item.title === "Cam Unlimited" ? (
                                                            <div className="text-[16px] font-bold">Cam <span className="text-[#4E2FD2]">Unlimited</span></div>
                                                        ) : (
                                                            item.title
                                                        )}
                                                    </span>
                                                    {item.variantLabel && (
                                                        <span className="text-xs text-gray-500">{item.variantLabel}</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {step.id !== 'plan' && (
                                                        <div className="scale-90 origin-right">
                                                            <Stepper
                                                                value={item.quantity}
                                                                isPannel={true}
                                                                onChange={(qty) => {
                                                                    dispatch({
                                                                        type: "SET_QUANTITY",
                                                                        payload: { productId: item.productId, variantId: item.variantId, quantity: qty }
                                                                    });
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col items-end min-w-[3rem]">
                                                        {item.compareAtPrice && item.compareAtPrice > item.price && (
                                                            <span className="text-[14px] text-[#6F7882] line-through ">
                                                                ${(item.compareAtPrice * item.quantity).toFixed(2)}
                                                            </span>
                                                        )}
                                                        <span className={`text-[14px] font-semibold ${item.compareAtPrice && item.compareAtPrice > item.price ? "text-[#4E2FD2]" : "text-gray-900"}`}>
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-2">
                                <div className="h-12 w-12 shrink-0 rounded-md border border-gray-100 flex items-center justify-center bg-white">
                                    <img src={fastShippingIcon} alt="Fast Shipping" className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">Fast Shipping</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[14px] text-[#6F7882] line-through">$5.99</span>
                                <span className="text-[14px] font-semibold text-[#5034E5]">FREE</span>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="flex items-center justify-between mb-2 md:flex-col sm:flex-col lg:flex-row">
                            <div className="flex items-center gap-2 sm:mb-4">
                                <img src={satisfactionBadge} alt="100% Wyze satisfaction guarantee" className="h-[131px] w-[131px] object-contain" />
                                <div className="ml-2 hidden md:block lg:hidden">
                                    <p className="font-semibold">30-day hassle-free returns</p>
                                    <p>If you're not totally in love with the product, we will refund you 100%.</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end md:flex-row md:items-center md:justify-between  xl:flex-col w-auto md:w-full xl:w-auto xl:items-end">
                                <span className="text-xs font-semibold text-white bg-[#5034E5] px-2 py-0.5 rounded mb-1">
                                    as low as ${(total / 12).toFixed(2)}/mo
                                </span>
                                <div className="flex items-baseline gap-2">
                                    {savings > 0 && (
                                        <span className="text-[18px] text-base text-gray-400 line-through">${totalPreDiscount.toFixed(2)}</span>
                                    )}
                                    <span className="text-[24px] font-bold text-[#5034E5]">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {savings > 0 && (
                            <div className="text-[12px] text-[#0AA288] text-center font-medium my-4">
                                Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
                            </div>
                        )}

                        <button className="w-full rounded-lg bg-[#4E2FD2] py-3.5 text-base font-semibold text-white hover:bg-[#432AC0] transition-colors mb-4">
                            Checkout
                        </button>

                        <div className="text-center">
                            <button onClick={handleSaveForLater} className="text-sm text-gray-500 underline hover:text-gray-900 transition-colors">
                                Save my system for later
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
