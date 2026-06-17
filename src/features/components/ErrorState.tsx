type Props = {
    message: string;
    onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: Props) {
    return (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <p className="mb-4 text-red-600">{message}</p>

            <button
                onClick={onRetry}
                className="rounded-lg bg-black px-4 py-2 text-white"
            >
                Retry
            </button>
        </div>
    );
}