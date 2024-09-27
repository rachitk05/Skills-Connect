import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/utils/db';
import Company from '@/models/Company'; // Import the Job model

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase(); // Ensure the database is connected
        const jobs = await Company.find({}); // Use Mongoose to fetch jobs
        return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
        console.error("Error fetching Companies:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// POST method for creating a new job
export async function POST(req: NextRequest) {
    try {
        const data = await req.json(); // Extract the body from the request
        await connectToDatabase(); // Ensure the database is connected
        const job = new Company(data); // Create a new instance of the Job model
        await job.save(); // Save the job to the database
        return NextResponse.json(job, { status: 201 });
    } catch (error) {
        console.error("Error saving Companies:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
