import mongoose, { Schema, Document } from 'mongoose';

interface Leader {
    name: string;
    title: string;
    image: string;
    description: string;
}

interface Benefit {
    icon: string;
    text: string;
}

export interface Job extends Document {
    title: string;
    companyId: mongoose.Types.ObjectId; // Reference to Company
    logo: string;
    location: string;
    salary: string;
    visaSponsorship: boolean;
    remoteWork: string;
    skills: string[];
    description: string;
    minimumQualifications: string;
    responsibilities: string[];
    experienceRequired: string;
    leaders: Leader[];
    benefits: Benefit[];
}

const LeaderSchema = new Schema<Leader>({
    name: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
});

const BenefitSchema = new Schema<Benefit>({
    icon: { type: String, required: true },
    text: { type: String, required: true },
});

const JobSchema = new Schema<Job>({
    title: { type: String, required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true }, // Reference to Company
    logo: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    visaSponsorship: { type: Boolean, required: true },
    remoteWork: { type: String, required: true },
    skills: { type: [String], required: true },
    description: { type: String, required: true },
    minimumQualifications: { type: String, required: true },
    responsibilities: { type: [String], required: true },
    experienceRequired: { type: String, required: true },
    leaders: { type: [LeaderSchema], required: true },
    benefits: { type: [BenefitSchema], required: true },
});

export default mongoose.models.Job || mongoose.model<Job>('Job', JobSchema);
