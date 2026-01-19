"use client";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { postsAPI, authAPI } from "@/lib/api";

export default function DashboardPage() {
  const { user, token, loading, logout } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const allPosts = await postsAPI.getAll(1, 1000);
      // Filter posts by current user
      const userPosts = allPosts.posts.filter(
        (post) => post.author._id === user.id
      );
      setPosts(userPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setPostsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleDeletePost = async (postId) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await postsAPI.delete(postId);
      setPosts(posts.filter((p) => p._id !== postId));
      alert("Post deleted successfully!");
    } catch (err) {
      alert("Error deleting post");
    }
  };

  if (loading || !user) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome, {user.name}!
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/blog/create"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
            >
              ✏️ New Blog Post
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Your Posts ({posts.length})
          </h2>

          {postsLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Loading your posts...
            </p>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't published any posts yet.
              </p>
              <Link
                href="/blog/create"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition inline-block"
              >
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>👁️ {post.views} views</span>
                      <span className="ml-4">💬 {post.comments.length} comments</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/blog/edit/${post._id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-center transition text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
