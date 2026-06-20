import { useBundleStore } from "../store/bundleContext";
import { Accordion } from "../../components/ui/Accordion";
import { ProductCard } from "../../components/ui/ProductCard";
import type { BundleStep } from "../../api/types";
import { getSelectedVariant, getVariantQuantity } from "../store/bundleSelectors";
import livestream from "../../assets/icons/livestream.svg"
import sensors from "../../assets/icons/sensors.svg"
import protection from "../../assets/icons/protection.svg"
import plan from "../../assets/icons/plan.svg"


function getStepIcon(icon: string) {
    // simple inline SVGs based on icon string
    if (icon === "camera") return <img src={livestream} alt="livestream" />
    if (icon === "shield") return <img src={plan} alt="plan" />;
    if (icon === "sensors") return <img src={sensors} alt="sensors" />;
    if (icon === "grid") return <img src={protection} alt="protection" />;
    return null;
}

export function BuilderArea({ steps }: { steps: BundleStep[] }) {
    const { state, dispatch } = useBundleStore();

    const handleNext = (currentIndex: number) => {
        if (currentIndex < steps.length - 1) {
            dispatch({ type: "SET_ACTIVE_STEP", payload: currentIndex + 1 });
        }
    };

    return (
        <div className="flex flex-col rounded-2xl bg-white">
            {steps.map((step, index) => {
                const isOpen = state.activeStep === index;
                const selectedCount = step.products.reduce((count, product) => {
                    const selection = state.selections[product.id];
                    if (!selection) return count;
                    const totalQty = Object.values(selection.variantQuantities).reduce((a, b) => a + b, 0);
                    return totalQty > 0 ? count + 1 : count;
                }, 0);

                return (
                    <Accordion
                        key={step.id}
                        stepNumber={index + 1}
                        totalSteps={steps.length}
                        title={step.title}
                        icon={getStepIcon(step.icon)}
                        isOpen={isOpen}
                        onToggle={() => dispatch({ type: "SET_ACTIVE_STEP", payload: index })}
                        onNext={index < steps.length - 1 ? () => handleNext(index) : undefined}
                        nextLabel={step.nextStepLabel}
                        selectedCount={selectedCount}
                        hideTopBorder={state.activeStep === index - 1}
                    >
                        <div>hello world</div>
                    </Accordion>
                );
            })}
        </div>
    );
}
