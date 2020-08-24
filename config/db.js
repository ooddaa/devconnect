const mongoose = require('mongoose');
const config = require('config');
const util = require('util')

let DBUSER, DBPASS;
if (!process.env.DBUSER) {
    console.error("No db user specified");
    process.exit(1);
} else {
    DBUSER = process.env.DBUSER
}

if (!process.env.DBPASS) {
    console.error("No db pass specified");
    process.exit(1);
} else {
    DBPASS = process.env.DBPASS
}

const db = config.get('mongoURI').replace(/<user>/, DBUSER).replace(/<pass>/, DBPASS);

const log = (...items) =>
    items.forEach(item =>
        console.log(util.inspect(item, { depth: null, colors: true }))
    );

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
        console.error(error.message);
        process.exit(1)
    }
}

module.exports = connectDB
