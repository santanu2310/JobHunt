"use client";

import { useState } from "react";
import { X } from "lucide-react";

type JobFormData = {
    title: string;
    designation: string;
    salary: string;
    jobType: string;
    category: string;
    deadline: string;
    location: string;
    image: File | null;
    skills: string;
    details: string;
};

const initialForm: JobFormData = {
    title: "",
    designation: "",
    salary: "",
    jobType: "",
    category: "",
    deadline: "",
    location: "",
    image: null,
    skills: "",
    details: "",
};

type AddJobProps = {
    onClose: () => void;
    onSubmit?: (data: JobFormData) => void;
};

export default function AddJob({ onClose, onSubmit }: AddJobProps) {
    const [form, setForm] = useState<JobFormData>(initialForm);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setForm((prev) => ({ ...prev, image: file }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit?.(form);
        onClose();
    }

    const inputClass =
        "w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

    return (
        <div className="bg-white border-2 border-blue-700 rounded-xl p-6 w-full max-w-2xl relative">
            {/* Close Button */}
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
            >
                <X size={20} />
            </button>

            <h2 className="text-lg font-bold text-blue-900 mb-5">Add Job Details</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full-width: Job Title */}
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter Job Title (Like Hotel Udaan Designer Team)"
                    className={inputClass}
                />

                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        placeholder="Designation (Like Sr. Graphic Designer)"
                        className={inputClass}
                    />
                    <input
                        type="text"
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        placeholder="Salary (Like 15k)"
                        className={inputClass}
                    />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="jobType"
                        value={form.jobType}
                        onChange={handleChange}
                        placeholder="Job Type (Like Full-Time)"
                        className={inputClass}
                    />
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Category (Like Design & Architecture)"
                        className={inputClass}
                    />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleChange}
                        placeholder="Deadline (Like 22 December 2025)"
                        className={inputClass}
                    />
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location (Like Darjeeling, India)"
                        className={inputClass}
                    />
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={`${inputClass} cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                    />
                    <input
                        type="text"
                        name="skills"
                        value={form.skills}
                        onChange={handleChange}
                        placeholder="Skill Name (Like React, CSS, HTML)"
                        className={inputClass}
                    />
                </div>

                {/* Full-width: Details */}
                <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    placeholder="Full job details..."
                    rows={7}
                    className={`${inputClass} resize-none`}
                />

                {/* Actions */}
                <div className="flex items-center gap-4 pt-1">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-2.5 rounded-md transition-colors"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold px-8 py-2.5 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
