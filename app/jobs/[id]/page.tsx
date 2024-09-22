'use client';
import { useParams } from 'next/navigation';
import JobDetails from "@/components/ProjectListing/jobDescription";

export default function App() {
    const { id } = useParams(); // This will extract the id from the URL

    return (
        <div>
            {id ? <JobDetails jobId={id as string} /> : <p>Loading...</p>} {/* Pass jobId to JobDetails */}
        </div>
    );
}
