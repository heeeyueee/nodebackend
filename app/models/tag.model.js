const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    id: Number,
    name: String,
    iconName: String,
    mold: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Tag', TagSchema);