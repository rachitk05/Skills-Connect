import mongoose, { Schema, Document } from 'mongoose';

interface Experience {
    title: string;
    company: string;
    duration: string;
    description: string;
}

interface Education {
    degree: string;
    school: string;
    year: string;
}

interface Project {
    name: string;
    url: string;
    description: string;
}

export interface Student extends Document {
    name: string;
    email: string;
    skills: string[];
    certifications: string[];
    portfolio: string;
    experience: Experience[];
    education: Education[];
    age: number;
    bio: string;
    profilePhoto: string;
    tagline: string;
    projects: Project[];
    interests: string[];
    languages: string[];
}

const StudentSchema = new Schema<Student>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: { type: [String], required: true },
    certifications: { type: [String], required: false },
    portfolio: { type: String, required: false },
    experience: [{
        title: { type: String, required: true },
        company: { type: String, required: true },
        duration: { type: String, required: true },
        description: { type: String, required: true }
    }],
    education: [{
        degree: { type: String, required: true },
        school: { type: String, required: true },
        year: { type: String, required: true }
    }],
    age: { type: Number, required: true },
    bio: { type: String, required: true },
    profilePhoto: { type: String, required: false },
    tagline: { type: String, required: true },
    projects: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        description: { type: String, required: true }
    }],
    interests: { type: [String], required: false },
    languages: { type: [String], required: false }
});

export default mongoose.models.Student || mongoose.model<Student>('Student', StudentSchema);
