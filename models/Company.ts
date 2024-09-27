import mongoose, { Schema, Document } from 'mongoose';

interface ICompany extends Document {
    name: string;
    email: string;
    bio: string;
    profilePicture: string;
    location: string;
    website: string;
    projectsPosted: number;
    ratings: string;
    category: string;
    foundedYear: number;
    employeeCount: string;
    specialties: string[];
    clients: string[];
    achievements: string[];
}

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    profilePicture: { type: String },
    location: { type: String },
    website: { type: String },
    projectsPosted: { type: Number, default: 0 },
    ratings: { type: String },
    category: { type: String },
    foundedYear: { type: Number },
    employeeCount: { type: String },
    specialties: { type: [String] },
    clients: { type: [String] },
    achievements: { type: [String] }
});

// Export the model
const Company = mongoose.model<ICompany>('Company', CompanySchema);

export default Company;
