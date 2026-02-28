"use client";

type DeleteConfirmationProps = {
    itemName: string;
    onCancel: () => void;
    onDelete: () => void;
};

export default function DeleteConfirmation({
    itemName,
    onCancel,
    onDelete,
}: DeleteConfirmationProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onCancel}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-80 p-6 flex flex-col items-center gap-5"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Warning Icon */}
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </div>

                {/* Message */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Delete Confirmation
                    </h3>
                    <p className="text-sm text-gray-500">
                        Are you sure you want to delete{" "}
                        <span className="font-medium text-gray-700">
                            &quot;{itemName}&quot;
                        </span>
                        ?
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 w-full">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
