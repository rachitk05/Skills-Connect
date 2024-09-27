import { NextResponse, NextRequest } from 'next/server';
import Company from '@/models/Company';
import connectToDatabase from "@/utils/db";

// Get Company by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // Extract the job ID from the URL parameters
    try {
        await connectToDatabase();
        const company = await Company.findById(id);

        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: company }, { status: 200 });
    } catch (error:any) {
        console.error("Error fetching company:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

// Create New Company
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        await connectToDatabase();

        const company = new Company(data);
        await company.save();

        return NextResponse.json({ success: true, data: company }, { status: 201 });
    } catch (error:any) {
        console.error("Error registering company:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

// Update Existing Company
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        await connectToDatabase();

        const updatedCompany = await Company.findByIdAndUpdate(params.id, data, {
            new: true, // Return the updated document
            runValidators: true // Validate the data against the schema
        });

        if (!updatedCompany) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedCompany }, { status: 200 });
    } catch (error:any) {
        console.error("Error updating company:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
