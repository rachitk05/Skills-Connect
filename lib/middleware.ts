// src/lib/middleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const verifyToken = (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = (decoded as any).userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
