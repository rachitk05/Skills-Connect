import mongoose from 'mongoose';

const Connection = async (): Promise<void> => {
    const url = process.env.MONGODB_URL || ''; // Store MongoDB URL in environment variable

    if (mongoose.connection.readyState >= 1) return; // Prevent multiple connections

    try {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        // Connection options object passed directly
        // @ts-ignore
        await mongoose.connect(url,opts);

        console.log("Database Connected successfully.");
    } catch (error) {
        console.error("Database connection failed", error);
    }
};

export default Connection;
