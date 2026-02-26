"use client";

import { useState } from "react";
import Image from "next/image";

type SlideCardProps = {
    image: string;
    name: string;
    active?: boolean;
    onView?: () => void;
    onDelete?: () => void;
    onToggle?: (active: boolean) => void;
};

export default function SlideCard({
    image,
    name,
    active: initialActive = true,
    onView,
    onDelete,
    onToggle,
}: SlideCardProps) {
    const [selected, setSelected] = useState(false);
    const [active, setActive] = useState(initialActive);

    function handleToggle() {
        const next = !active;
        setActive(next);
        onToggle?.(next);
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full max-w-xs">
            {/* Image Section */}
            <div className="relative w-full h-44">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
                {/* Checkbox */}
                <button
                    onClick={() => setSelected((prev) => !prev)}
                    className={`absolute top-2 right-2 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${selected
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white/80 border-gray-300 text-transparent hover:border-blue-400"
                        }`}
                    aria-label="Select slide"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                            d="M3 7l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {/* Info Section */}
            <div className="px-4 py-3 space-y-2 text-sm">
                {/* Name */}
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-medium w-14">Name</span>
                    <span className="text-gray-800 font-semibold">{name}</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-medium w-14">Status</span>
                    <button
                        onClick={handleToggle}
                        className={`relative inline-flex items-center w-10 h-5 rounded-full transition-colors focus:outline-none ${active ? "bg-green-500" : "bg-gray-300"
                            }`}
                        aria-label="Toggle status"
                    >
                        <span
                            className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${active ? "translate-x-5" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>

                {/* Action */}
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-medium w-14">Action</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onView}
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            View
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={onDelete}
                            className="text-red-500 hover:underline font-semibold"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
