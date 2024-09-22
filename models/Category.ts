import mongoose, { Schema, Document } from 'mongoose';

export interface Category extends Document {
    name: string;
}

const CategorySchema = new Schema<Category>({
    name: { type: String, required: true, unique: true }
});

export default mongoose.models.Category || mongoose.model<Category>('Category', CategorySchema);
