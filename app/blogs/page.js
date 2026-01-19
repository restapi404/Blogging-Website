"use client";
import { useEffect, useState } from "react";
import BlogCard from "../blog/BlogCard";
import SearchBar from "../../components/SearchBar";
import { postsAPI } from "@/lib/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await postsAPI.getAll(1, 100);
        const formattedBlogs = data.posts.map((post) => ({
          id: post._id,
          title: post.title,
          image: post.image,
          summary: post.excerpt,
          author: post.author.name,
          date: new Date(post.createdAt).toLocaleDateString(),
          tags: [post.category],
          content: post.content,
        }));
        setBlogs(formattedBlogs);
        setFiltered(formattedBlogs);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFiltered(blogs);
      return;
    }

    try {
      const results = await postsAPI.search(query);
      const formattedResults = results.map((post) => ({
        id: post._id,
        title: post.title,
        image: post.image,
        summary: post.excerpt,
        author: post.author.name,
        date: new Date(post.createdAt).toLocaleDateString(),
        tags: [post.category],
        content: post.content,
      }));
      setFiltered(formattedResults);
    } catch (err) {
      console.error("Error searching:", err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-[#750000] text-3xl font-bold mb-6 dark:text-[#4C4CA8]">All Blogs</h2>
      {loading && <p className="text-center text-gray-600 dark:text-gray-400">Loading blogs...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}
      {!loading && !error && (
        <>
          <SearchBar onSearch={handleSearch} />
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.length > 0 ? (
              filtered.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600 dark:text-gray-400">
                No blogs found
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}