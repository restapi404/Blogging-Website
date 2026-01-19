const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  getPostsByCategory,
  searchPosts,
} = require('../controllers/postController');
const { createComment, getCommentsByPost, updateComment, deleteComment, likeComment } = require('../controllers/commentController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Post routes - SPECIFIC ROUTES FIRST (before /:id catch-all)
router.post('/', authenticate, createPost);
router.get('/search', searchPosts);
router.get('/category/:category', getPostsByCategory);

// Generic routes after specific ones
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);
router.post('/:id/like', authenticate, likePost);

// Comment routes
router.post('/:postId/comments', authenticate, createComment);
router.get('/:postId/comments', getCommentsByPost);
router.put('/comments/:id', authenticate, updateComment);
router.delete('/comments/:id', authenticate, deleteComment);
router.post('/comments/:id/like', authenticate, likeComment);

module.exports = router;
