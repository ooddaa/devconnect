const mongoose = require('mongoose');

// https://docs.mongodb.com/realm/mongodb/document-schemas/
/* Documents in MongoDB are objects stored in a format called BSON, a binary-encoded superset of JSON that supports additional data types. */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);