import {NextResponse,NextRequest} from "next/server";
import Proposal from '@/models/Proposal'; // Assuming you have a Proposal model
import connectToDatabase from "@/utils/db";
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const proposals = await Proposal.find({ projectId: params.id });
        return NextResponse.json(proposals, { status: 200 });
    } catch (error) {
        console.error("Error fetching proposals:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        data.projectId = params.id; // Set the project ID in the proposal
        await connectToDatabase();
        const proposal = new Proposal(data);
        await proposal.save();
        return NextResponse.json(proposal, { status: 201 });
    } catch (error) {
        console.error("Error submitting proposal:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

