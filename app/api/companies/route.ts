import { NextResponse, NextRequest } from 'next/server';
import Company from '@/models/Company';
import connectToDatabase from "@/utils/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const company = await Company.findById(params.id);
        if (!company) {
            return NextResponse.json({ message: 'Company not found' }, { status: 404 });
        }
        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        console.error("Error fetching company:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        await connectToDatabase();
        const company = new Company(data);
        await company.save();
        return NextResponse.json(company, { status: 201 });
    } catch (error) {
        console.error("Error registering company:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        await connectToDatabase();

        const updatedCompany = await Company.findByIdAndUpdate(params.id, data, {
            new: true, // Return the updated document
            runValidators: true // Validate the data against the schema
        });

        if (!updatedCompany) {
            return NextResponse.json({ message: 'Company not found' }, { status: 404 });
        }

        return NextResponse.json(updatedCompany, { status: 200 });
    } catch (error) {
        console.error("Error updating company:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}