const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    tagIds: Array,
    note: String,
    category: String,
    amount: Number,
    createdAt: String,
    userId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Record', RecordSchema);