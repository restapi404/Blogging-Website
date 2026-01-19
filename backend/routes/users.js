const express = require('express');
const { getAllUsers, getUserById, followUser, getUserPosts } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/:id/follow', authenticate, followUser);
router.get('/:id/posts', getUserPosts);

module.exports = router;
