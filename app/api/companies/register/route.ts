import { NextResponse, NextRequest } from 'next/server';
import Company from '@/models/Company';
import connectToDatabase from "@/utils/db";

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

