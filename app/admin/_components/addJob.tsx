"use client";

import { useActionState, useEffect } from "react";
import { X } from "lucide-react";
import { createJob, updateJob } from "@/actions/jobs";

type Job = {
    id: string;
    title: string;
    designation: string;
    salary: string | null;
    category: string | null;
    jobType: string | null;
    location: string | null;
    deadline: string | null;
    image: string | null;
    skills: string | null;
    details: string | null;
    isActive: boolean;
};

type AddJobProps = {
    onClose: () => void;
    onJobCreated?: (job: Job) => void;
    onJobUpdated?: (job: Job) => void;
    editJob?: Job | null;
};

export default function AddJob({ onClose, onJobCreated, onJobUpdated, editJob }: AddJobProps) {
    const isEditMode = !!editJob;

    const [createState, createAction, isCreating] = useActionState(createJob, undefined);
    const [updateState, updateAction, isUpdating] = useActionState(updateJob, undefined);

    const state = isEditMode ? updateState : createState;
    const formAction = isEditMode ? updateAction : createAction;
    const isPending = isEditMode ? isUpdating : isCreating;

    useEffect(() => {
        if (state?.success) {
            if (isEditMode && state.job && onJobUpdated) {
                onJobUpdated(state.job as Job);
            } else if (!isEditMode && state.job && onJobCreated) {
                onJobCreated(state.job as Job);
            }
            onClose();
        }
    }, [state?.success, onClose, onJobCreated, onJobUpdated, state?.job, isEditMode]);

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

            <h2 className="text-lg font-bold text-blue-900 mb-5">
                {isEditMode ? "Edit Job Details" : "Add Job Details"}
            </h2>

            {/* Error Message */}
            {state?.error && (
                <p className="text-red-500 text-sm mb-3">{state.error}</p>
            )}

            <form action={formAction} className="space-y-4">
                {/* Hidden ID field for edit mode */}
                {isEditMode && (
                    <input type="hidden" name="id" value={editJob.id} />
                )}

                {/* Full-width: Job Title */}
                <input
                    type="text"
                    name="title"
                    defaultValue={editJob?.title ?? ""}
                    placeholder="Enter Job Title (Like Hotel Udaan Designer Team)"
                    className={inputClass}
                />

                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="designation"
                        defaultValue={editJob?.designation ?? ""}
                        placeholder="Designation (Like Sr. Graphic Designer)"
                        className={inputClass}
                    />
                    <input
                        type="text"
                        name="salary"
                        defaultValue={editJob?.salary ?? ""}
                        placeholder="Salary (Like 15k)"
                        className={inputClass}
                    />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="jobType"
                        defaultValue={editJob?.jobType ?? ""}
                        placeholder="Job Type (Like Full-Time)"
                        className={inputClass}
                    />
                    <input
                        type="text"
                        name="category"
                        defaultValue={editJob?.category ?? ""}
                        placeholder="Category (Like Design & Architecture)"
                        className={inputClass}
                    />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="deadline"
                        defaultValue={editJob?.deadline ?? ""}
                        placeholder="Deadline (Like 22 December 2025)"
                        className={inputClass}
                    />
                    <input
                        type="text"
                        name="location"
                        defaultValue={editJob?.location ?? ""}
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
                        className={`${inputClass} cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                    />
                    <input
                        type="text"
                        name="skills"
                        defaultValue={editJob?.skills ?? ""}
                        placeholder="Skill Name (Like React, CSS, HTML)"
                        className={inputClass}
                    />
                </div>

                {/* Full-width: Details */}
                <textarea
                    name="details"
                    defaultValue={editJob?.details ?? ""}
                    placeholder="Full job details..."
                    rows={7}
                    className={`${inputClass} resize-none`}
                />

                {/* Actions */}
                <div className="flex items-center gap-4 pt-1">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending
                            ? (isEditMode ? "Updating..." : "Submitting...")
                            : (isEditMode ? "Update" : "Submit")
                        }
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
