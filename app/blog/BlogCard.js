import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogCard({ blog }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow p-4 flex flex-col cursor-pointer"
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="rounded mb-4 h-40 object-cover"
      />
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{blog.summary}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {blog.tags.map(tag => (
          <span key={tag} className="bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        By {blog.author} • {blog.date}
      </div>
      <Link
        href={`/blog/${blog.id}`}
        className="mt-auto text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-200 transition"
      >
        Read More
      </Link>
    </motion.div>
  );
}
