const express = require('express')
const { AddPost, deletePost, getPost, getPosts, updatePost } = require('../Controllers/postController.js');

const router = express.Router();
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', AddPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

module.exports=router;