import mongoose, { Schema, Document } from 'mongoose';

export interface Student extends Document {
    name: string;
    email: string;
    skills: string[];
    certifications: string[];
    portfolio: string;
    experience: string;
    education: string;
    collegeName: string;
    age: number;
    bio: string;
    profilePhoto: string;
    tagline: string;
    projects: string[];
}

const StudentSchema = new Schema<Student>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: { type: [String], required: true },
    certifications: { type: [String], required: false },
    portfolio: { type: String, required: false },
    experience: { type: String, required: false },
    education: { type: String, required: true },
    collegeName: { type: String, required: true },
    age: { type: Number, required: true },
    bio: { type: String, required: true },
    profilePhoto: { type: String, required: false },
    tagline: { type: String, required: true },
    projects: { type: [String], required: false }
});

export default mongoose.models.Student || mongoose.model<Student>('Student', StudentSchema);
