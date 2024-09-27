import { NextResponse, NextRequest } from 'next/server';
import Student from '@/models/Student';
import connectToDatabase from "@/utils/db";

// Register New Student
export async function POST(req: NextRequest) {
    try {
        // Parse the incoming JSON data
        const data = await req.json();
        // Connect to the database
        await connectToDatabase();

        // Create a new student instance with the incoming data
        const student = new Student(data);

        // Save the new student to the database
        await student.save();

        // Return a success response with the created student data
        return NextResponse.json({ success: true, data: student }, { status: 201 });
    } catch (error: any) {
        console.error("Error registering student:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
