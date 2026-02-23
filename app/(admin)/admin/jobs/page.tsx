"use client";

import { useState } from "react";
import AddJob from "@/app/(admin)/admin/_components/addJob";

type Job = {
    id: number;
    title: string;
    designation: string;
    salary: string;
    category: string;
    jobType: string;
    location: string;
    deadline: string;
    active: boolean;
};

const initialJobs: Job[] = [
    { id: 1, title: "Hotel Udaan Team..", designation: "Sr. Graphic Des..", salary: "15,000", category: "Design", jobType: "Full-Time", location: "Location", deadline: "12/11/25", active: true },
    { id: 2, title: "Hotel Udaan Team..", designation: "Sr. Graphic Des..", salary: "15,000", category: "Design", jobType: "Full-Time", location: "Location", deadline: "12/11/25", active: true },
    { id: 3, title: "Hotel Udaan Team..", designation: "Sr. Graphic Des..", salary: "15,000", category: "Design", jobType: "Full-Time", location: "Location", deadline: "12/11/25", active: true },
    { id: 4, title: "Hotel Udaan Team..", designation: "Sr. Graphic Des..", salary: "15,000", category: "Design", jobType: "Full-Time", location: "Location", deadline: "12/11/25", active: true },
    { id: 5, title: "Hotel Udaan Team..", designation: "Sr. Graphic Des..", salary: "15,000", category: "Design", jobType: "Full-Time", location: "Location", deadline: "12/11/25", active: true },
    { id: 6, title: "Hotel Udaan Team..", designation: "Sr. Graphic Des..", salary: "15,000", category: "Design", jobType: "Full-Time", location: "Location", deadline: "12/11/25", active: true },
    { id: 7, title: "Hotel Udaan Team..", designation: "Sr. Graphic Des..", salary: "15,000", category: "Design", jobType: "Full-Time", location: "Location", deadline: "12/11/25", active: true },
    { id: 8, title: "Hotel Udaan Team..", designation: "Sr. Graphic Des..", salary: "15,000", category: "Design", jobType: "Full-Time", location: "Location", deadline: "12/11/25", active: true },
];

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showAddJob, setShowAddJob] = useState(false);

    const allSelected = selectedIds.length === jobs.length;

    function toggleAll() {
        setSelectedIds(allSelected ? [] : jobs.map((j) => j.id));
    }

    function toggleOne(id: number) {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    function toggleActive(id: number) {
        setJobs((prev) =>
            prev.map((j) => (j.id === id ? { ...j, active: !j.active } : j))
        );
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
                    onClick={() => setShowAddJob(true)}
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
                                <td className="px-4 py-3 text-gray-600">{job.salary}</td>
                                <td className="px-4 py-3 text-gray-600">{job.category}</td>
                                <td className="px-4 py-3 text-gray-600">{job.jobType}</td>
                                <td className="px-4 py-3 text-gray-600">{job.location}</td>
                                <td className="px-4 py-3 text-gray-600">{job.deadline}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <button className="text-blue-600 hover:underline font-medium">
                                            View
                                        </button>
                                        <span className="text-gray-300">|</span>
                                        <button className="text-gray-700 hover:underline font-medium">
                                            Edit
                                        </button>
                                        <span className="text-gray-300">|</span>
                                        <button className="text-red-500 hover:underline font-medium">
                                            Delete
                                        </button>
                                        {/* Toggle Switch */}
                                        <button
                                            onClick={() => toggleActive(job.id)}
                                            className={`relative inline-flex items-center w-10 h-5 rounded-full transition-colors focus:outline-none ${job.active ? "bg-green-500" : "bg-gray-300"
                                                }`}
                                            aria-label="Toggle active"
                                        >
                                            <span
                                                className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${job.active ? "translate-x-5" : "translate-x-1"
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

            {/* Add Job Modal */}
            {showAddJob && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={() => setShowAddJob(false)}
                >
                    <div
                        className="animate-[fadeIn_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AddJob onClose={() => setShowAddJob(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
