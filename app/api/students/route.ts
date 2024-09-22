import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/utils/db';
import Student from '@/models/Student';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const student = await Student.findById(params.id);
        if (!student) {
            return NextResponse.json({ message: 'Student not found' }, { status: 404 });
        }
        return NextResponse.json(student, { status: 200 });
    } catch (error) {
        console.error("Error fetching students:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        await connectToDatabase();
        const student = new Student(data);
        await student.save();
        return NextResponse.json(student, { status: 201 });
    } catch (error) {
        console.error("Error registering students:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        await connectToDatabase();

        const updatedStudent = await Student.findByIdAndUpdate(params.id, data, {
            new: true, // Return the updated document
            runValidators: true // Validate the data against the schema
        });

        if (!updatedStudent) {
            return NextResponse.json({ message: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json(updatedStudent, { status: 200 });
    } catch (error) {
        console.error("Error updating students:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}