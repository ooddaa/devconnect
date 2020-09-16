const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

async function connectDB() {
    try {
        const cn = await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('MongoDB connected\n');
    } catch (error) {
        console.error('connectDB error:', error.message);
        process.exit(1)
    }
}

module.exports = connectDB
