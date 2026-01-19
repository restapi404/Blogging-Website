/**
 * MIGRATION SCRIPT: Convert blogs.json to MongoDB
 * 
 * Run this ONCE to migrate your existing blogs to MongoDB
 * Usage: node scripts/migrateBlogsToMongoDB.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

const blogsData = require('../../public/data/blogs.json');

async function migrateBlogsToMongoDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Create a default user (author) if it doesn't exist
    let author = await User.findOne({ email: 'rithu@blog.local' });
    
    if (!author) {
      author = new User({
        name: 'Rithu',
        email: 'rithu@blog.local',
        password: 'migrated_user_123', // Hashed automatically by schema
        bio: 'Original blog author',
      });
      await author.save();
      console.log('✅ Created default author user');
    }

    // Category mapping function
    const mapCategory = (tags) => {
      const validCategories = ['Technology', 'Lifestyle', 'Business', 'Health', 'Travel', 'Other'];
      
      for (const tag of tags) {
        if (validCategories.includes(tag)) {
          return tag;
        }
      }
      
      // Map common tags to valid categories
      const tagStr = tags.join(' ').toLowerCase();
      if (tagStr.includes('web') || tagStr.includes('frontend') || tagStr.includes('backend') || 
          tagStr.includes('database') || tagStr.includes('git') || tagStr.includes('ai') ||
          tagStr.includes('edge') || tagStr.includes('networking') || tagStr.includes('css')) {
        return 'Technology';
      }
      
      return 'Other';
    };

    // Migrate blogs
    let createdCount = 0;
    for (const blog of blogsData) {
      // Check if blog already exists
      const existingPost = await Post.findOne({ title: blog.title });
      
      if (!existingPost) {
        const post = new Post({
          title: blog.title,
          content: blog.content,
          excerpt: blog.summary,
          author: author._id,
          category: mapCategory(blog.tags),
          image: blog.image || 'https://via.placeholder.com/600x400',
          published: true,
        });
        
        await post.save();
        
        // Add post to user's posts
        author.posts.push(post._id);
        await author.save();
        
        createdCount++;
        console.log(`✅ Migrated: "${blog.title}"`);
      } else {
        console.log(`⏭️  Already exists: "${blog.title}"`);
      }
    }

    console.log(`\n🎉 Migration complete!`);
    console.log(`📊 Created ${createdCount} new posts`);
    console.log(`📝 Author: ${author.email}`);
    
    await mongoose.connection.close();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
migrateBlogsToMongoDB();
