const Post = require('../models/postModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

//=======Create a post
// POST: api/posts
// PROTECTED
const createPost = async (req, res, next) => {
	try {
		let { title, category, description } = req.body;
		if (!title || !category || !description || !req.files) {
			return next(
				new HttpError('Fill in all fields and choose thumbnail.', 422)
			);
		}
		const { thumbnail } = req.files;
		//check the file size
		if (thumbnail.size > 2000000) {
			return next(
				new HttpError('Thumbnail too big. File should be less than 2mb')
			);
		}
		let filename = thumbnail.name;
		let splittedFilename = filename.split('.');
		let newFilename =
			splittedFilename[0] +
			uuid() +
			'.' +
			splittedFilename[splittedFilename.length - 1];
		thumbnail.mv(
			path.join(__dirname, '..', 'uploads', newFilename),
			async (err) => {
				if (err) {
					return next(new HttpError(err));
				} else {
					const newPost = await Post.create({
						title,
						category,
						description,
						thumbnail: newFilename,
						creator: req.user.id,
					});
					if (!newPost) {
						return next(new HttpError("Post couldn't be created"), 422);
					}
					//find user and increate post count by 1
					const currentUser = await User.findById(req.user.id);
					const userPostCount = currentUser.posts + 1;
					await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
					res.status(201).json(newPost);
				}
			}
		);
	} catch (err) {
		return next(new HttpError(err));
	}
};

//=======Get all post
// GET: api/posts
// PROTECTED
const getPosts = async (req, res, next) => {
	try {
		const posts = await Post.find().sort({ updatedAt: -1 });
		res.status(200).json(posts);
	} catch (err) {
		return next(new HttpError(err));
	}
};

//=======Get single post
// GET: api/posts/:id
// PROTECTED
const getPost = async (req, res, next) => {
	try {
		const postId = req.params.id;
		const post = await Post.findById(postId);
		if (!post) {
			return next(new HttpError('Post not found', 404));
		}
		res.status(200).json(post);
	} catch (err) {
		return next(new HttpError(err));
	}
};

//=======Get posts by category
// GET: api/posts/category/:category
// UNPROTECTED
const getCatPost = async (req, res, next) => {
	try {
		const { category } = req.params;
		const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
		res.status(200).json(catPosts);
	} catch (err) {
		return next(new HttpError(err));
	}
};

//=======Get author post
// GET: api/posts/users/:id
// UNPROTECTED
const getUserPost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
		res.status(200).json(posts);
	} catch (err) {
		return next(new HttpError(err));
	}
};

//=======Edit Post
// PATCH: api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
	try {
		let filename;
		let newFilename;
		let updatedPost;
		const postId = req.params.id;
		let { title, category, description } = req.body;

		// ReactQuill has a paragraph opening and closing tag with a break tag in between so there are 11 characters in there already.
		if (!title || !category || description.length < 12) {
			return next(
				new HttpError('Fill in all fields.', 422)
			);
		}
		// get old post from database
		const oldPost = await Post.findById(postId);
		if (req.user.id == oldPost.creator) {
			if (!req.files) {
				updatedPost = await Post.findByIdAndUpdate(
					postId,
					{ title, category, description },
					{ new: true }
				);
			} else {
				//delete old thumbnail from upload
				fs.unlink(
					path.join(__dirname, '..', 'uploads', oldPost.thumbnail),
					async (err) => {
						if (err) {
							return next(new HttpError(err));
						}
					}
				);
				// upload new thumbnail
				const { thumbnail } = req.files;
				// check file size
				if (thumbnail.size > 2000000) {
					return next(
						new HttpError('Thumbnail too big. Should be less than 2mb')
					);
				}
				filename = thumbnail.name;
				let splittedFilename = filename.split('.');
				newFilename =
					splittedFilename[0] +
					uuid() +
					'.' +
					splittedFilename[splittedFilename.length - 1];
				thumbnail.mv(
					path.join(__dirname, '..', 'uploads', newFilename),
					async (err) => {
						if (err) {
							return next(new HttpError(err));
						}
					}
				);
				updatedPost = await Post.findByIdAndUpdate(
					postId,
					{ title, description, thumbnail: newFilename },
					{ new: true }
				);
			}
		}
		if (!updatedPost) {
			return next(new HttpError("Couldn't update post.", 400));
		}
		res.status(200).json(updatedPost);
	} catch (err) {
		return next(new HttpError(err));
	}
};

//=======Delete Post
// DELETE api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
	try {
		const postId = req.params.id;
		if (!postId) {
			return next(new HttpError('Post unavailable', 400));
		}
		const post = await Post.findById(postId);
		const fileName = post?.thumbnail;
		if (req.user.id == post.creator) {
			//delete thumbnail from upload folder
			fs.unlink(
				path.join(__dirname, '..', 'uploads', fileName),
				async (err) => {
					if (err) {
						return next(new HttpError(err));
					} else {
						await Post.findByIdAndDelete(postId);
						// find user and reduce post count by 1
						const currentUser = await User.findById(req.user.id);
						const userPostCount = currentUser?.posts - 1;
						await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
					}
				}
			);
		} else {
			return next(new HttpError("Post couldn't be deleted", 403));
		}

		res.json(`Post ${postId} deleted successfully.`);
	} catch (err) {
		return next(new HttpError(err));
	}
};

module.exports = {
	createPost,
	getPost,
	getPosts,
	getCatPost,
	getUserPost,
	editPost,
	deletePost,
};
