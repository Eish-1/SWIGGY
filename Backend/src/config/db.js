import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        // Successful connection logging with colored output
        console.log(colors.green.underline(
            `MongoDB Connected: ${conn.connection.host}`
        ));

        // Optional: Log the database name
        console.log(colors.cyan(
            `Database Name: ${conn.connection.db.databaseName}`
        ));

    } catch (error) {
        // Detailed error logging
        console.error(colors.red('MongoDB Connection Error:'), error.message);
        
        // Exit the process with failure
        process.exit(1);
    }
};

export default connectDB;