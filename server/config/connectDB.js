const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        const connection = mongoose.connection
        connection.on('connected ', () => {
            console.log("DB connection successfully");
        })
        connection.on('error', (error) => {
            throw new Error(`MongoDB Connection Error: ${error.message}`);

        })
    } catch (error) {
        throw new Error(`MongoDB Connection Error: ${error.message}`);
    }
}
module.exports = connectDB;