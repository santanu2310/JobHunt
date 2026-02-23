"use client";

import { useState, useRef } from "react";
import SlideCard from "@/app/(admin)/admin/_components/slideCard";

type Slide = {
    id: number;
    image: string;
    name: string;
    active: boolean;
};

const initialSlides: Slide[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    image: "/slider-placeholder.jpg",
    name: "New Year Slider",
    active: i % 2 === 0,
}));

export default function SliderPage() {
    const [slides, setSlides] = useState<Slide[]>(initialSlides);
    const [sliderName, setSliderName] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    function handleSubmit() {
        // TODO: wire up submission logic
    }

    function handleToggle(id: number, active: boolean) {
        setSlides((prev) =>
            prev.map((s) => (s.id === id ? { ...s, active } : s))
        );
    }

    function handleDelete(id: number) {
        // TODO: wire up delete logic
    }

    function handleView(id: number) {
        // TODO: wire up view logic
    }

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <h1 className="text-xl font-bold text-gray-800">Slider</h1>

            {/* Top Bar */}
            <div className="flex items-center gap-3 flex-wrap">
                <input
                    type="text"
                    value={sliderName}
                    onChange={(e) => setSliderName(e.target.value)}
                    placeholder="Slider Name"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-36"
                />
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

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {slides.map((slide) => (
                    <SlideCard
                        key={slide.id}
                        image={slide.image}
                        name={slide.name}
                        active={slide.active}
                        onView={() => handleView(slide.id)}
                        onDelete={() => handleDelete(slide.id)}
                        onToggle={(active) => handleToggle(slide.id, active)}
                    />
                ))}
            </div>
        </div>
    );
}
