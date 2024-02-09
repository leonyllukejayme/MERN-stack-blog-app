const express = require('express');
const {
	createPost,
	getPost,
	getPosts,
	getCatPost,
	getUserPost,
	editPost,
	deletePost,
} = require('../controllers/postControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/category/:category', getCatPost);
router.get('/users/:id', getUserPost);
router.patch('/:id', authMiddleware, editPost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
