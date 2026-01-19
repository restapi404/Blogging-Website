const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      content,
      author: req.user.userId,
      post: postId,
    });

    await comment.save();

    // Add comment to post
    post.comments.push(comment._id);
    await post.save();

    await comment.populate('author', 'name profileImage');

    res.status(201).json({
      message: 'Comment created successfully',
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate('author', 'name profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    let comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment = await Comment.findByIdAndUpdate(id, { content }, { new: true })
      .populate('author', 'name profileImage');

    res.status(200).json({
      message: 'Comment updated successfully',
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(id);

    // Remove comment from post
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: id },
    });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.likes.includes(req.user.userId)) {
      // Unlike
      comment.likes.pull(req.user.userId);
    } else {
      // Like
      comment.likes.push(req.user.userId);
    }

    await comment.save();

    res.status(200).json({
      message: 'Like toggled successfully',
      likes: comment.likes.length,
      isLiked: comment.likes.includes(req.user.userId),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
