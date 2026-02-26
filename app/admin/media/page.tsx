"use client";

import { useState, useRef } from "react";
import ImageCard from "@/app/admin/_components/imageCard";
import VideoCard from "@/app/admin/_components/videoCard";

type ImageItem = {
    id: number;
    image: string;
    name: string;
};

type VideoItem = {
    id: number;
    url: string;
    name: string;
};

const initialImages: ImageItem[] = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    image: "/image-placeholder.jpg",
    name: "Image Title",
}));

const initialVideos: VideoItem[] = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    name: "Video Title",
}));

type MediaType = "image" | "video";

export default function MediaPage() {
    const [mediaType, setMediaType] = useState<MediaType>("image");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [videoLink, setVideoLink] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    const [images, setImages] = useState<ImageItem[]>(initialImages);
    const [videos, setVideos] = useState<VideoItem[]>(initialVideos);

    function handleSubmit() {
        // TODO: wire up submission logic
    }

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <h1 className="text-xl font-bold text-gray-800">Gallery</h1>

            {/* Top Bar */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* Media Type Dropdown */}
                <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as MediaType)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-8 cursor-pointer"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                    }}
                >
                    <option value="image">Images</option>
                    <option value="video">Video</option>
                </select>

                {/* Title */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={mediaType === "image" ? "Image Name" : "Video Name"}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-36"
                />

                {/* Conditional: File or Video Link */}
                {mediaType === "image" ? (
                    <>
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-400 hover:border-gray-400 transition-colors w-40 text-left truncate"
                        >
                            {file ? file.name : "Choose file.."}
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            className="hidden"
                        />
                    </>
                ) : (
                    <input
                        type="text"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        placeholder="Video Link.."
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40"
                    />
                )}

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition-colors"
                >
                    Submit
                </button>
                <button className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold px-6 py-2 rounded-md transition-colors flex items-center gap-1">
                    Delete
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5">
                        <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Image Section */}
            <div>
                <h2 className="text-lg font-bold text-gray-700 mb-4">Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {images.map((img) => (
                        <ImageCard
                            key={img.id}
                            image={img.image}
                            name={img.name}
                            onView={() => { }}
                            onDelete={() => { }}
                        />
                    ))}
                </div>
            </div>

            {/* Video Section */}
            <div>
                <h2 className="text-lg font-bold text-gray-700 mb-4">Video</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {videos.map((vid) => (
                        <VideoCard
                            key={vid.id}
                            url={vid.url}
                            name={vid.name}
                            onReplace={() => { }}
                            onDelete={() => { }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
