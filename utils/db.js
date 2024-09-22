const mongoose = require('mongoose');

const connectToDatabase = async () => {
    const url = process.env.MONGODB_URI || ''; // Store MongoDB URL in environment variable

    if (mongoose.connection.readyState >= 1) return; // Prevent multiple connections

    try {
        // Connection options object passed directly
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Database Connected successfully.");
    } catch (error) {
        console.error("Database connection failed", error);
    }
};

export default connectToDatabase;
