const Post = require('../Models/postModel')
const jwt = require("jsonwebtoken");
const User = require('../Models/userModel');

const getPosts = async (req, res) => {
    try {
        const data = req.query.cat ? await Post.find({ cat: req.query.cat }).populate('userId') : await Post.find().populate('userId').sort({date: -1});
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
    }
}
const getPost = async (req, res) => {
    try {
        const data = await Post.find({ _id: req.params.id }).populate("userId")
        return res.status(200).json(data[0]);
    } catch (e) {
        console.log(e)
    }
}
const AddPost = async (req, res) => {
    const token = req.header("authorization");
    if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
    let user;
    try {
        user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({ status: false, msg: "Invalid token" });
    }
    try {
        const userInfo = await User.findById(user.id)
        const values = {
            title: req.body.title,
            desc: req.body.desc,
            date: req.body.date,
            img: req.body.img,
            cat: req.body.cat,
            userId: userInfo.id
        }
        await Post.create(values);
        return res.status(200).json("Post has been created")
    }
    catch (err) {
        return res.status(401).json({ status: false, msg: "Invalid token" });
    }
}
const deletePost = async (req, res) => {
    const token = req.header("authorization");
    if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
    let user;
    try {
        user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).json({ status: false, msg: "Invalid token" });
    }
    try {
        const userInfo = await User.findById(user.id)
        const post = await Post.findOne({ _id: req.params.id });
        if (post.userId.toString() !== userInfo._id.toString()) {
            return res.status(403).json("You can delete only your posts")
        }
        await Post.findByIdAndDelete({ _id: post._id });
        return res.status(200).json("Post has been deleted")
    }
    catch (err) {
        return res.status(401).json({ status: false, msg: "Invalid token" });
    }
}
const updatePost = async (req, res) => {
    const token = req.header("authorization");
    if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
    let user;
    try {
        user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).json({ status: false, msg: "Invalid token" });
    }
    try {
        const userInfo = await User.findById(user.id)
        const post = await Post.findOne({ _id: req.params.id });
        if (post.userId.toString() !== userInfo._id.toString()) {
            return res.status(403).json("You can update only your posts")
        }
        const values = {
            title: req.body.title,
            desc: req.body.desc,
            img: req.body.img,
            cat: req.body.cat
        }
        await Post.findByIdAndUpdate({ _id: post._id }, values);
        return res.status(200).json("Post has been updated")
    }
    catch (err) {
        return res.status(401).json({ status: false, msg: "Invalid token" });
    }
}
module.exports = { AddPost, deletePost, getPost, getPosts, updatePost } 