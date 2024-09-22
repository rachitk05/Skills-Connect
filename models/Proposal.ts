import mongoose, { Schema, Document } from 'mongoose';

export interface Proposal extends Document {
    projectId: mongoose.Types.ObjectId; // Reference to the project
    studentId: mongoose.Types.ObjectId; // Reference to the students
    budget: number;
    message: string;
    createdAt: Date;
    status: string;
}

const ProposalSchema = new Schema<Proposal>({
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    studentId: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
    budget: { type: Number, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

export default mongoose.models.Proposal || mongoose.model<Proposal>('Proposal', ProposalSchema);
