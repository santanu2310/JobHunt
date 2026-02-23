"use client";

import { useState } from "react";

type VideoCardProps = {
    url: string;
    name: string;
    onReplace?: () => void;
    onDelete?: () => void;
};

function getYouTubeEmbedUrl(url: string): string {
    const regExp =
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match
        ? `https://www.youtube.com/embed/${match[1]}`
        : url;
}

export default function VideoCard({
    url,
    name,
    onReplace,
    onDelete,
}: VideoCardProps) {
    const [selected, setSelected] = useState(false);
    const embedUrl = getYouTubeEmbedUrl(url);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full max-w-xs">
            {/* Video Section */}
            <div className="relative w-full h-44">
                <iframe
                    src={embedUrl}
                    title={name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                />
                {/* Checkbox */}
                <button
                    onClick={() => setSelected((prev) => !prev)}
                    className={`absolute top-2 right-2 z-10 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${selected
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white/80 border-gray-300 text-transparent hover:border-blue-400"
                        }`}
                    aria-label="Select video"
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
            <div className="px-4 py-3 space-y-1.5 text-sm">
                {/* Name */}
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-medium w-14">Name</span>
                    <span className="text-gray-800 font-semibold">{name}</span>
                </div>

                {/* Action */}
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-medium w-14">Action</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onReplace}
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Replace
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
