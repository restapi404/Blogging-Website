# Blogging Website - Backend Setup Guide

## Overview
Your blogging website backend is now fully built with:
- **Database**: MongoDB (using MongoDB Atlas free tier)
- **Server**: Node.js + Express
- **Authentication**: JWT + bcryptjs
- **APIs**: RESTful API with complete CRUD operations

---

## Database Setup - MongoDB Atlas (Free)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" and create a free account
3. Create a new project (name it "bloghub")

### Step 2: Create a Cluster
1. Click "Create a Deployment"
2. Select **FREE** tier (M0 - Shared)
3. Choose your region (closest to you)
4. Click "Create Deployment"

### Step 3: Get Connection String
1. Click "Connect" on your cluster
2. Select "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<username>` with your database username
6. Add `/bloghub` at the end to specify the database name

### Step 4: Update .env file
```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/bloghub?retryWrites=true&w=majority
```

---

## Backend Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Create .env file (if not exists)
```bash
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bloghub?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID (optional for OAuth)
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET (optional for OAuth)
```

### Step 3: Start the Backend Server
```bash
npm run dev
# or
node app.js
```

Server runs on: `http://localhost:5000`

---

## API Endpoints

### Authentication APIs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register a new user |
| POST | `/api/auth/login` | ❌ | Login user |
| POST | `/api/auth/logout` | ✅ | Logout user |
| GET | `/api/auth/profile` | ✅ | Get current user profile |
| PUT | `/api/auth/profile` | ✅ | Update user profile |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Posts APIs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/posts` | ❌ | Get all posts (paginated) |
| GET | `/api/posts?page=1&limit=10` | ❌ | Paginated posts |
| GET | `/api/posts/:id` | ❌ | Get single post |
| POST | `/api/posts` | ✅ | Create new post |
| PUT | `/api/posts/:id` | ✅ | Update post (own only) |
| DELETE | `/api/posts/:id` | ✅ | Delete post (own only) |
| POST | `/api/posts/:id/like` | ✅ | Like/unlike post |
| GET | `/api/posts/category/:category` | ❌ | Get posts by category |
| GET | `/api/posts/search?query=keyword` | ❌ | Search posts |

**Create Post Request:**
```json
{
  "title": "My First Blog Post",
  "content": "This is the full content of my blog post...",
  "excerpt": "Short summary of the post",
  "category": "Technology",
  "image": "https://example.com/image.jpg"
}
```

**Categories:** Technology, Lifestyle, Business, Health, Travel, Other

---

### Comments APIs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/posts/:postId/comments` | ✅ | Create comment |
| GET | `/api/posts/:postId/comments` | ❌ | Get all comments |
| PUT | `/api/posts/comments/:id` | ✅ | Update comment (own only) |
| DELETE | `/api/posts/comments/:id` | ✅ | Delete comment (own only) |
| POST | `/api/posts/comments/:id/like` | ✅ | Like/unlike comment |

**Create Comment Request:**
```json
{
  "content": "Great post! Really helpful."
}
```

---

### Users APIs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users` | ❌ | Get all users |
| GET | `/api/users/:id` | ❌ | Get user profile |
| POST | `/api/users/:id/follow` | ✅ | Follow/unfollow user |
| GET | `/api/users/:id/posts` | ❌ | Get user's posts |

---

## Features Implemented

### ✅ User Authentication
- Register with name, email, password
- Login with JWT token
- Password hashing with bcryptjs
- Protected routes with authentication middleware
- User profile with bio and profile image

### ✅ Blog Posts
- Create posts with title, content, excerpt, category, image
- Get all posts with pagination
- Get single post (increments view count)
- Update posts (owner only)
- Delete posts (owner only)
- Like/unlike posts
- Search posts by title or content
- Filter by category

### ✅ Comments
- Add comments to posts
- Edit comments (owner only)
- Delete comments (owner only)
- Like/unlike comments
- Nested comment display

### ✅ User Management
- Follow/unfollow users
- View user profiles with followers/following
- Get user's posts
- User bio and profile image

---

## Environment Variables Explained

```env
PORT=5000                           # Server port
MONGO_URI=...                       # MongoDB connection string
JWT_SECRET=...                      # Secret key for JWT tokens
GOOGLE_CLIENT_ID=...                # (Optional) For Google OAuth
GOOGLE_CLIENT_SECRET=...            # (Optional) For Google OAuth
```

---

## Free APIs/Services Used

✅ **MongoDB Atlas** - Free tier (512MB storage, perfect for development)
✅ **JWT** - Built-in, no cost
✅ **bcryptjs** - Open source password hashing

### Optional Integrations (Free Tier)
- **Cloudinary** - Image hosting (free tier available)
- **Nodemailer** - Email notifications (use free SMTP)

---

## Testing with Postman

1. Download Postman: https://www.postman.com/downloads/
2. Create a new request
3. Test endpoints like:

**Register:**
```
POST http://localhost:5000/api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login:**
```
POST http://localhost:5000/api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Create Post (copy token from login response):**
```
POST http://localhost:5000/api/posts
Headers: Authorization: Bearer YOUR_TOKEN
{
  "title": "My Blog Post",
  "content": "Content here...",
  "excerpt": "Summary",
  "category": "Technology",
  "image": "https://example.com/img.jpg"
}
```

---

## Troubleshooting

### MongoDB Connection Error
- Check your connection string format
- Ensure your IP is whitelisted in MongoDB Atlas (Security > Network Access)
- Verify username and password

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### Token Expires
- Tokens expire after 7 days
- User needs to login again to get a new token

---

## Next Steps

1. **Frontend Integration** - Connect your Next.js frontend to these APIs
2. **Image Uploads** - Integrate Cloudinary for post/profile images
3. **Email Notifications** - Send emails for comments/follows
4. **Deployment** - Deploy to Heroku, Railway, or Vercel

---

## Project Structure
```
backend/
├── models/          # Database schemas (User, Post, Comment)
├── controllers/     # Business logic (auth, posts, users, comments)
├── routes/          # API endpoints
├── middleware/      # Authentication middleware
├── app.js           # Main server file
├── .env             # Environment variables
└── package.json     # Dependencies
```

---

Enjoy building! 🚀
