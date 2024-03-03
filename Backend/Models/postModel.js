const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        title: { type: "String", required: true },
        desc: { type: "String", unique: true, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        img: {
            type: "String",
        },
        date: {
            type: "String",
        },
        cat: {
            type: "String",
        },
    }
);


const Post = mongoose.model("Post", postSchema);

module.exports = Post;