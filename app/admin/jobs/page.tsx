import { getAllJobs } from "@/actions/jobs";
import JobsTable from "./JobsTable";

export default async function JobsPage() {
    const result = await getAllJobs();

    const jobs = result.jobs ?? [];

    return <JobsTable initialJobs={jobs} />;
}
