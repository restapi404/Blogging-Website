# Blogging Website 📝

A full-stack blogging platform where users can register, login, and create, edit, and manage blog posts through a clean and responsive interface.

🔗 **Frontend (Vercel):** https://blogging-website-lzrm.vercel.app/  
🔗 **Backend API (Render):** https://blogging-website-vlph.onrender.com  

---

## Features
- User authentication (Register / Login / Logout)
- Create, edit, delete blog posts
- User-specific dashboard
- Protected routes
- Responsive UI
- REST API integration
---

## Tech Stack
**Frontend:** Next.js, React, Tailwind CSS  
**Backend:** Node.js, Express, MongoDB, JWT  
**Deployment:** Vercel, Render, MongoDB Atlas  


## Environment Variables:

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=https://blogging-website-vlph.onrender.com
```

### Backend (`.env`)
```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```
---

## Run Locally
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm start
```
---

## Contribution
Feel free to fork, submit issues, or open pull requests to improve the project.

## License
MIT License © 2025
