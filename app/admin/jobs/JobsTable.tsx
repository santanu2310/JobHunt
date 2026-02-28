"use client";

import { useState } from "react";
import AddJob from "@/app/admin/_components/addJob";
import { deleteJob, toggleJobActive } from "@/actions/jobs";
import { useNotification } from "@/app/admin/_components/notification";
import { JobCard } from "@/app/(user)/jobs/_components/job-card";

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

type JobsTableProps = {
    initialJobs: Job[];
};

export default function JobsTable({ initialJobs }: JobsTableProps) {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showAddJob, setShowAddJob] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [viewingJob, setViewingJob] = useState<Job | null>(null);
    const { notify } = useNotification();

    const allSelected = jobs.length > 0 && selectedIds.length === jobs.length;

    function toggleAll() {
        setSelectedIds(allSelected ? [] : jobs.map((j) => j.id));
    }

    function toggleOne(id: string) {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    async function toggleActive(id: string) {
        const result = await toggleJobActive(id);
        if (result.success) {
            setJobs((prev) =>
                prev.map((j) => (j.id === id ? { ...j, isActive: result.isActive! } : j))
            );
            notify(result.isActive ? "Job activated." : "Job deactivated.", "success");
        } else {
            notify(result.error || "Failed to update job status.", "error");
        }
    }

    async function handleDelete(id: string) {
        const result = await deleteJob(id);
        if (result.success) {
            setJobs((prev) => prev.filter((j) => j.id !== id));
            setSelectedIds((prev) => prev.filter((x) => x !== id));
            notify("Job deleted successfully.", "success");
        } else {
            notify(result.error || "Failed to delete job.", "error");
        }
    }

    function handleEdit(job: Job) {
        setEditingJob(job);
        setShowAddJob(true);
    }

    function closeModal() {
        setShowAddJob(false);
        setEditingJob(null);
    }

    return (
        <div className="space-y-5">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-800">All Live Jobs</h1>
            </div>

            {/* Add Button */}
            <div>
                <button
                    onClick={() => { setEditingJob(null); setShowAddJob(true); }}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
                >
                    Add/Post a Job
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="w-10 px-4 py-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={toggleAll}
                                    className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                                />
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Enter Job Title</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Designation</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Salary</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Job Type</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Location</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Deadline</th>
                            <th className="px-4 py-3 text-left font-semibold text-blue-600">
                                Delete <span className="text-xs">&#x2304;</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {jobs.map((job) => (
                            <tr
                                key={job.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(job.id)}
                                        onChange={() => toggleOne(job.id)}
                                        className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                                    />
                                </td>
                                <td className="px-4 py-3 text-gray-700">{job.title}</td>
                                <td className="px-4 py-3 text-gray-600">{job.designation}</td>
                                <td className="px-4 py-3 text-gray-600">{job.salary ?? "—"}</td>
                                <td className="px-4 py-3 text-gray-600">{job.category ?? "—"}</td>
                                <td className="px-4 py-3 text-gray-600">{job.jobType ?? "—"}</td>
                                <td className="px-4 py-3 text-gray-600">{job.location ?? "—"}</td>
                                <td className="px-4 py-3 text-gray-600">{job.deadline ?? "—"}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <button
                                            onClick={() => setViewingJob(job)}
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            View
                                        </button>
                                        <span className="text-gray-300">|</span>
                                        <button
                                            onClick={() => handleEdit(job)}
                                            className="text-gray-700 hover:underline font-medium"
                                        >
                                            Edit
                                        </button>
                                        <span className="text-gray-300">|</span>
                                        <button
                                            onClick={() => handleDelete(job.id)}
                                            className="text-red-500 hover:underline font-medium"
                                        >
                                            Delete
                                        </button>
                                        {/* Toggle Switch */}
                                        <button
                                            onClick={() => toggleActive(job.id)}
                                            className={`relative inline-flex items-center w-10 h-5 rounded-full transition-colors focus:outline-none ${job.isActive ? "bg-green-500" : "bg-gray-300"
                                                }`}
                                            aria-label="Toggle active"
                                        >
                                            <span
                                                className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${job.isActive ? "translate-x-5" : "translate-x-1"
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Job Modal */}
            {showAddJob && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className="animate-[fadeIn_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AddJob
                            key={editingJob?.id ?? "new"}
                            onClose={closeModal}
                            editJob={editingJob}
                            onJobCreated={(job) => {
                                setJobs((prev) => [job, ...prev]);
                                notify("Job created successfully!", "success");
                            }}
                            onJobUpdated={(job) => {
                                setJobs((prev) =>
                                    prev.map((j) => (j.id === job.id ? job : j))
                                );
                                notify("Job updated successfully!", "success");
                            }}
                        />
                    </div>
                </div>
            )}

            {/* View Job Preview Modal */}
            {viewingJob && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    onClick={() => setViewingJob(null)}
                >
                    <div
                        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-50 rounded-2xl p-6 animate-[fadeIn_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setViewingJob(null)}
                            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-300 transition-colors shadow-sm"
                            aria-label="Close preview"
                        >
                            <i className="ri-close-line text-lg"></i>
                        </button>
                        <JobCard job={{ ...viewingJob, createdAt: new Date(), updatedAt: new Date() }} />
                    </div>
                </div>
            )}
        </div>
    );
}
