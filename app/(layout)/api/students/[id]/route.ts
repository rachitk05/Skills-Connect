import { NextResponse, NextRequest } from 'next/server';
import Student from '@/models/Student';
import connectToDatabase from "@/utils/db";

// Get Student by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const student = await Student.findById(params.id);

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: student }, { status: 200 });
    } catch (error:any) {
        console.error("Error fetching student:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}


// Update Existing Student
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        await connectToDatabase();

        const updatedStudent = await Student.findByIdAndUpdate(params.id, data, {
            new: true, // Return the updated document
            runValidators: true // Validate the data against the schema
        });

        if (!updatedStudent) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedStudent }, { status: 200 });
    } catch (error:any) {
        console.error("Error updating student:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
