import { JobCard } from "./_components/job-card";
import { getAllJobs } from "@/actions/jobs";

export default async function JobDetailsPage() {
    const { jobs, error } = await getAllJobs(true);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="w-full bg-linear-to-b from-blue-50/50 to-gray-50 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Find Jobs</h1>
                <p className="text-gray-600">Home / Find Jobs</p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - List of Jobs */}
                    <div className="lg:col-span-2">
                        {error && <p className="text-red-500 py-4">{error}</p>}
                        {jobs?.length === 0 && <p className="text-gray-500 py-4">No jobs currently available.</p>}
                        {/* Iterating multiple JobCards */}
                        {jobs?.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}

                    </div>

                    {/* Right Column - Application Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.06)] p-8 mb-8 sticky top-28">
                            <div className="text-center mb-6">
                                <h3 className="text-[26px] font-bold text-[#1a2b49] leading-tight">
                                    Let's Connect for <br /> <span className="text-blue-600">Success!</span>
                                </h3>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Mobile Number"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>
                                <div>
                                    <select
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-500 appearance-none bg-transparent"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select Remarks</option>
                                        <option value="freelance">Freelance</option>
                                        <option value="fulltime">Full Time</option>
                                    </select>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Message"
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400 resize-none"
                                    ></textarea>
                                </div>
                                <button type="button" className="w-full bg-[#4F75FF] hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors">
                                    Submit
                                </button>
                            </form>
                            {/* Image Placeholder */}
                            <div className="w-full mt-6 aspect-3/4 overflow-hidden rounded-xl bg-gray-200 relative">
                                <img src="/image.png" alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
