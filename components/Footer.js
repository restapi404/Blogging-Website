export default function Footer() {
  return (
    <footer className="bg-[#4A0000] dark:bg-[#0C0C24] text-white py-4 mt-8 text-center">
      <span className="text-sm">
        © {new Date().getFullYear()} Blog Showcase. All rights reserved.
      </span>
    </footer>
  );
}