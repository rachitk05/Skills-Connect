import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "@/utils/db";
import Job from '../../../models/Job';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("DB CONNECTION STARTED")
    await connectToDatabase();

    if (req.method == 'GET') {
        const jobs = await Job.find({});
        res.status(200).json(jobs);
    }
    else if (req.method == 'POST') {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    }
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}