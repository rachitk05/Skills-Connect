import mongoose, { Schema, Document } from 'mongoose';

export interface Company extends Document {
    name: string;
    email: string;
    bio: string;
    logo: string;
    location: string;
    website: string;
    projectsPosted: number;
    ratings: number;
    category: string; // e.g., "Tech", "Education", "Finance"
}

const CompanySchema = new Schema<Company>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: true },
    logo: { type: String, required: false },
    location: { type: String, required: false },
    website: { type: String, required: false },
    projectsPosted: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
    category: { type: String, required: true } // Added category field
});

export default mongoose.models.Company || mongoose.model<Company>('Company', CompanySchema);
