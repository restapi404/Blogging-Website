# 🚀 Quick Start: Frontend + Backend Integration

## Start Both Servers (Do This First!)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
✅ Runs on: http://localhost:5000

### Terminal 2 - Frontend
```bash
cd .
npm run dev
```
✅ Runs on: http://localhost:3000

---

## Test It Now!

1. **Open browser**: http://localhost:3000
2. **Click "Browse Blogs"** → See all posts from database
3. **Click on a blog** → See full content + comments section
4. **Search a keyword** → Results from database

---

## What Works

✅ View all blogs (from MongoDB)
✅ View single blog with full content
✅ View all comments on a blog
✅ Add comments (need to implement login first)
✅ Search posts by title/content
✅ View count increments on each visit

---

## File Locations

| File | Purpose |
|------|---------|
| `lib/api.js` | All API functions |
| `.env.local` | Frontend config (API URL) |
| `app/blogs/page.js` | All blogs page |
| `app/blog/[id]/page.js` | Single blog + comments |
| `backend/.env` | Backend config |
| `backend/app.js` | Backend server |

---

## Common Issues

**"Cannot GET /"** in browser?
→ That's normal! Go to http://localhost:3000/blogs instead

**No posts showing?**
→ Make sure backend is running AND you created posts in it

**Comments section empty?**
→ Backend needs to be running and MongoDB connected

**Search doesn't work?**
→ Restart frontend after backend is running

---

## Next Steps

To add authentication and more features:

1. **Create Auth Pages** - Login/Register UI
2. **Add Create Post** - Form to publish posts
3. **Add Like Button** - Heart icon for posts
4. **Add Edit/Delete** - Manage your posts
5. **Add User Profiles** - View other users

See `FRONTEND_INTEGRATION.md` for detailed guide!

---

## All Ready? 

Both servers running? 
✅ Yes → Go to http://localhost:3000/blogs
❌ No → Follow "Start Both Servers" section above

🎉 Your full-stack blogging platform is live!
