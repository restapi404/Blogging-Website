import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata = {
  title: "Blog Showcase",
  description: "A showcase of developer blogs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#06060A] text-gray-900 dark:text-gray-100">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}