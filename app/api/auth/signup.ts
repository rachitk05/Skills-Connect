import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ message: 'User already exists' });
        }

        // Hash password and save user
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

