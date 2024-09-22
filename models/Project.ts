import mongoose, { Schema, Document } from 'mongoose';

export interface Project extends Document {
    title: string;
    description: string;
    companyId: mongoose.Types.ObjectId; // Reference to Company
    budget: number;
    skillsRequired: string[];
    proposals: number;
    tenure: { start: Date; end: Date };
    categoryId: mongoose.Types.ObjectId; // Reference to Category
    location: string;
    jobId: mongoose.Types.ObjectId; // Reference to Job
}

const ProjectSchema = new Schema<Project>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    budget: { type: Number, required: true },
    skillsRequired: { type: [String], required: true },
    proposals: { type: Number, default: 0 },
    tenure: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
    },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
    location: { type: String, required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true }
});

export default mongoose.models.Project || mongoose.model<Project>('Project', ProjectSchema);
