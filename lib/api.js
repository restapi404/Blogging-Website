// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  login: async (credentials) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.token) localStorage.setItem('token', data.token);
    return data;
  },

  logout: async () => {
    localStorage.removeItem('token');
    const res = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return res.json();
  },

  getProfile: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` },
      credentials: 'include',
    });
    return res.json();
  },

  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(profileData),
    });
    return res.json();
  },
};

// Posts APIs
export const postsAPI = {
  getAll: async (page = 1, limit = 10) => {
    const res = await fetch(
      `${API_URL}/api/posts?page=${page}&limit=${limit}`,
      { credentials: 'include' }
    );
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL}/api/posts/${id}`, {
      credentials: 'include',
    });
    return res.json();
  },

  create: async (postData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(postData),
    });
    return res.json();
  },

  update: async (id, postData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(postData),
    });
    return res.json();
  },

  delete: async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
      credentials: 'include',
    });
    return res.json();
  },

  like: async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts/${id}/like`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      credentials: 'include',
    });
    return res.json();
  },

  getByCategory: async (category, page = 1, limit = 10) => {
    const res = await fetch(
      `${API_URL}/api/posts/category/${category}?page=${page}&limit=${limit}`,
      { credentials: 'include' }
    );
    return res.json();
  },

  search: async (query) => {
    const res = await fetch(`${API_URL}/api/posts/search?query=${encodeURIComponent(query)}`, {
      credentials: 'include',
    });
    return res.json();
  },
};

// Comments APIs
export const commentsAPI = {
  create: async (postId, content) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ content }),
    });
    return res.json();
  },

  getByPost: async (postId) => {
    const res = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
      credentials: 'include',
    });
    return res.json();
  },

  update: async (commentId, content) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ content }),
    });
    return res.json();
  },

  delete: async (commentId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
      credentials: 'include',
    });
    return res.json();
  },

  like: async (commentId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/posts/comments/${commentId}/like`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      credentials: 'include',
    });
    return res.json();
  },
};

// Users APIs
export const usersAPI = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/api/users`, {
      credentials: 'include',
    });
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL}/api/users/${id}`, {
      credentials: 'include',
    });
    return res.json();
  },

  follow: async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/users/${id}/follow`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      credentials: 'include',
    });
    return res.json();
  },

  getPosts: async (id) => {
    const res = await fetch(`${API_URL}/api/users/${id}/posts`, {
      credentials: 'include',
    });
    return res.json();
  },
};
