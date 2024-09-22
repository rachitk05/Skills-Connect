import mongoose, { Schema, Document } from 'mongoose';

interface Leader {
    name: string;
    title: string;
    image: string;
    description: string;
}

interface Benefit {
    icon: string; // Assuming you will replace this with the actual icon path
    text: string;
}

export interface Job extends Document {
    title: string;
    company: string;
    logo: string;
    location: string;
    salary: string;
    visaSponsorship: boolean;
    remoteWork: string;
    skills: string[];
    description: string;
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
    company: { type: String, required: true },
    logo: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    visaSponsorship: { type: Boolean, required: true },
    remoteWork: { type: String, required: true },
    skills: { type: [String], required: true },
    description: { type: String, required: true },
    leaders: { type: [LeaderSchema], required: true },
    benefits: { type: [BenefitSchema], required: true },
});

export default mongoose.models.Job || mongoose.model<Job>('Job', JobSchema);
