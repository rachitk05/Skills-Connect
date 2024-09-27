import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db'; // Adjust the import based on your setup
import Job from '@/models/Job'; // Adjust the import based on your setup

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // Extract the job ID from the URL parameters

    try {
        await connectToDatabase(); // Ensure the database is connected

        // Find the job by ID
        const job = await Job.findById(id); // Mongoose method to find a document by ID

        if (!job) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        // Transform the job object to the required format if necessary
        const transformedJob = {
            _id: job._id.toString(), // Convert ObjectId to string
            title: job.title,
            company: job.company,
            logo: job.logo,
            location: job.location,
            salary: job.salary,
            visaSponsorship: job.visaSponsorship,
            remoteWork: job.remoteWork,
            skills: job.skills,
            description: job.description,
            minimumQualifications: job.minimumQualifications,
            responsibilities: job.responsibilities,
            experienceRequired: job.experienceRequired,
            leaders: job.leaders.map((leader: { _id: { toString: () => any; }; name: any; title: any; image: any; description: any; }) => ({
                _id: leader._id.toString(), // Convert ObjectId to string
                name: leader.name,
                title: leader.title,
                image: leader.image,
                description: leader.description,
            })),
            benefits: job.benefits.map((benefit: { _id: { toString: () => any; }; icon: any; text: any; }) => ({
                _id: benefit._id.toString(), // Convert ObjectId to string
                icon: benefit.icon,
                text: benefit.text,
            })),
        };

        return NextResponse.json(transformedJob, { status: 200 });
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
