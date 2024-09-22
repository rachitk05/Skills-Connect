import {NextRequest,NextResponse} from "next/server";
import Project from '@/models/Project';
import connectToDatabase from "@/utils/db";
export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const projects = await Project.find({});
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        await connectToDatabase();
        const project = new Project(data);
        await project.save();
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
