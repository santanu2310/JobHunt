"use client";

import { useState } from "react";
import Image from "next/image";

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
    createdAt: Date;
    updatedAt: Date;
};

export function JobCard({ job }: { job: Job }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const skillsArray = job.skills ? job.skills.split(',').map((skill) => skill.trim()) : [];

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.06)] p-6 mb-6 border border-gray-100 relative">
            {/* Header info - always visible */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#0B2136] rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                        {job.image ? (
                            <Image src={job.image} alt={job.title} width={48} height={48} className="object-contain" />
                        ) : (
                            <Image src="/fullLogo.svg" alt="Company Logo" width={48} height={48} className="object-contain" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{job.title}{job.location ? `, ${job.location}` : ""}</h2>
                        <p className="text-gray-500">{job.designation}</p>
                    </div>
                </div>
                <div className="text-blue-600 font-semibold text-right">
                    {job.salary ? `Salary Up to ${job.salary}` : "Salary Undisclosed"}
                </div>
            </div>

            <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-500">
                {job.category && (
                    <div className="flex items-center gap-2">
                        <i className="ri-briefcase-4-line text-blue-600"></i>
                        <span>{job.category}</span>
                    </div>
                )}
                {job.jobType && (
                    <div className="flex items-center gap-2">
                        <i className="ri-time-line text-blue-600"></i>
                        <span>{job.jobType}</span>
                    </div>
                )}
                {job.deadline && (
                    <div className="flex items-center gap-2">
                        <i className="ri-calendar-event-line text-blue-600"></i>
                        <span>Deadline: {job.deadline}</span>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-medium">
                        {skill}
                    </span>
                ))}
            </div>

            {/* Expandable content */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0 pt-0'
                    }`}
            >
                <div className="overflow-hidden">
                    {/* Job Description Text */}
                    <div className="prose prose-gray max-w-none mb-10 text-gray-600 leading-relaxed text-[15px]">
                        {/* Render job details dynamically, handling line breaks */}
                        {job.details ? (
                            job.details.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4">{paragraph}</p>
                            ))
                        ) : (
                            <p className="mb-4">No additional details provided.</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pb-2">
                        <button className="px-8 py-2.5 rounded border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                            Apply Now
                        </button>
                        <button className="px-8 py-2.5 rounded border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                            WhatsApp
                        </button>
                    </div>
                </div>
            </div>

            {/* Toggle Arrow Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute right-6 bottom-4 flex justify-center items-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                aria-label={isExpanded ? "Show less details" : "Show more details"}
            >
                <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-xl`}></i>
            </button>
        </div>
    );
}
