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

bookSchema.pre('save', function (next) {
    if (this.isNew) {
        this.author = this.author || "Anonymous";
        this.description = this.description || "No description available";
        this.tags = this.tags || [];
        this.readCount = this.readCount || 0;
        this.currentReaders = this.currentReaders || 0;
    }
    next();
});

module.exports = mongoose.model("Books", bookSchema);
