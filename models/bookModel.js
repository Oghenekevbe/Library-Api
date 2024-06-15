const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],

    },
    author: {
        type: String,
        default: "Anonymous"
    },
    description: {
        type: String,
        default: "No description available"
    },
    tags: [{ type: String }],
    readCount: { type: Number, default: 0 },
    currentReaders: { type: Number, default: 0 }
});



module.exports = mongoose.model("Books", bookSchema);