"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Animation variants for sections and elements
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut", delay },
  }),
};

const pop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "backOut", delay },
  }),
};

export default function HomePage() {
  return (
    <main
      className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* HERO */}
      <section className="snap-start min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#FFF9C4] via-[#FFE2C4] to-[#FFC4C4] dark:from-[#12211F] dark:via-[#222D38] dark:to-[#171726] relative">
        <NavbarSpacer />
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold gradient-text mb-6 -mt-16 text-center dark:bg-gradient-to-r dark:from-[#76B893] dark:via-[#6EA1C2] dark:to-[#503D85]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Welcome to Blog Showcase
        </motion.h1>
        <motion.p
          className="max-w-2xl text-xl md:text-2xl mb-8 text-center text-gray-700 dark:text-gray-200"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          Big ideas in small, digestible blogs<br />
          Web, AI, and databases — without the jargon<br/>
          Level up your dev skills, post by post
        </motion.p>
        <motion.div
          variants={pop}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="flex gap-4"
        >
          <Link
            href="/blogs"
            className="bg-[#4A0000] text-[#F0E79E] font-bold rounded-full px-8 py-4 shadow-xl hover:bg-[#542B2B] hover:text-[#FFF37D] hover:scale-105 transition 
            dark:bg-[#2E244D] dark:text-[#76B893] dark:hover:bg-[#3A3063] dark:hover:text-[#85C7A1]"
          >
            Browse Blogs
          </Link>
          <Link
            href="/about"
            className="bg-[#FFF37D] text-[#4A0000] font-bold rounded-full px-8 py-4 shadow hover:bg-yellow-300 hover:scale-105 transition 
            dark:bg-[#6AA383] dark:text-[#0C0138] dark:hover:bg-[#48705A] dark:hover:text-[#4D4178]"
          >
            Learn More
          </Link>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <span className="text-4xl animate-bounce">↓</span>
        </motion.div>
      </section>

      {/* SECTION: WHAT IS THIS */}
      <section className="snap-start min-h-screen flex flex-col justify-center items-center bg-white dark:bg-[#0C0C24] px-6">
        <motion.h2
          className="text-5xl font-extrabold mb-8 text-center"
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.5 }}
        >
          Blog Showcase is for
          <span
            className="
              gradient-text
              dark:bg-gradient-to-r dark:from-[#76B893] dark:via-[#6EA1C2] dark:to-[#503D85]
              bg-clip-text text-transparent
              "
          > every developer
            </span>.<br />
        </motion.h2>
        <motion.div
          className="max-w-3xl text-xl text-gray-700 dark:text-gray-200 mb-8 text-center"
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.5 }}
          custom={0.2}
        >
          Whether you’re learning to debug your first program, exploring web design tricks, or diving into AI at the edge, this is the place for you. Explore practical guides, real-world examples, and concepts explained simply — with a touch of advanced insight when you’re ready.
        </motion.div>
        <motion.div
          className="flex flex-wrap gap-8 justify-center"
          variants={pop}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          custom={0.3}
        >
          {[
            { icon: "👩‍💻", label: "Frontend Devs" },
            { icon: "🔒", label: "Security Buffs" },
            { icon: "🤖", label: "AI Explorers" },
            { icon: "⚡", label: "Performance Buffs" },
            { icon: "🧑‍🎓", label: "New Learners" },
            { icon: "🌍", label: "Open Source Contributors" },
          ].map((itm, i) => (
            <div
              key={itm.label}
              className="flex flex-col items-center bg-yellow-50 dark:bg-gray-800 rounded-xl px-6 py-4 shadow hover:scale-105 transition"
            >
              <span className="text-4xl mb-2">{itm.icon}</span>
              <span className="font-bold">{itm.label}</span>
            </div>
          ))}
        </motion.div>
      </section>
      
      {/* SECTION: FEATURES */}
      <section className="snap-start min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#FFF9C4] via-[#FFE2C4] to-[#FFC4C4] dark:from-[#12211F] dark:via-[#222D38] dark:to-[#171726] relative px-6">
        <motion.h2
          className="text-4xl font-extrabold mb-8 text-center"
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.5 }}
        >
          Features of this blog that <span
            className="
              gradient-text
              dark:bg-gradient-to-r dark:from-[#76B893] dark:via-[#6EA1C2] dark:to-[#503D85]
              bg-clip-text text-transparent
              "
          > stand out</span>
        </motion.h2>
        <motion.div
          className="max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-10"
          variants={pop}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          <FeatureCard icon="🚀" title="Practical & Actionable" desc="Every post gives you tips you can actually use." />
          <FeatureCard icon="💡" title="Beginner-Friendly" desc="Concepts explained clearly, step by step." />
          <FeatureCard icon="🧠" title="Advanced Insights" desc="Sprinkle of deeper knowledge when you’re ready." />
          <FeatureCard icon="🔍" title="Searchable Knowledge" desc="Find posts by topic, tech stack, or author easily." />
        </motion.div>
      </section>

      {/* SECTION: TESTIMONIALS */}
      <section className="snap-start min-h-screen flex flex-col justify-center items-center bg-white dark:bg-[#0C0C24] px-6">
        <motion.h2
          className="text-4xl font-extrabold mb-8 text-center"
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span
            className="
              gradient-text
              dark:bg-gradient-to-r dark:from-[#76B893] dark:via-[#6EA1C2] dark:to-[#503D85]
              bg-clip-text text-transparent
              "
          >Mini Blogs</span>
        </motion.h2>
        <motion.div
          className="flex flex-col md:flex-row gap-8 max-w-5xl justify-center"
          variants={pop}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          <Testimonial
          image="/secure.png"
          title="Secure Web Apps"
            desc="Use HTTPS, parameterized queries, and JWT authentication to secure applications. Prevent XSS, CSRF, and SQL injection with proper validation and headers."
          />
          <Testimonial
          image="/microsoft.png"
          title="Microservices Architecture"
            desc="Break monolithic apps into microservices for independent scaling and fault isolation. Orchestrate deployments efficiently using Kubernetes."
          />
          <Testimonial
          image="/nodejss.png"
          title="Node.js Performance"
            desc="Node.js handles high concurrency via non-blocking I/O and event-driven architecture. Clustering enables horizontal scaling for real-time applications."
          />
        </motion.div>
      </section>

      {/* SECTION: CTA */}
      <section className="snap-start min-h-screen flex flex-col justify-center items-center bg-[#4A0000] text-[#EDE587] px-4 dark:bg-black">
        <motion.h2
          className="text-5xl font-extrabold mb-10 text-center"
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.5 }}
        >
          Ready to level up your skills?
        </motion.h2>
        <motion.p
          className="max-w-xl text-xl mb-8 text-center"
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.5 }}
          custom={0.15}
        >
          Dive into practical tips, tutorials, and insights — all written to make coding simpler and more fun. <br />
        </motion.p>
        <motion.div
          variants={pop}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          custom={0.2}
        >
          <Link
            href="/blogs"
            className="bg-[#EDE587] text-black font-bold rounded-full px-12 py-5 shadow-xl text-2xl hover:bg-yellow-300 hover:scale-105 transition"
          >
            Start Exploring
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

// Spacer to account for your sticky/fixed navbar (if any)
function NavbarSpacer() {
  return <div className="h-20 w-full" />;
}

function StatItem({ big, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-black gradient-text bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 bg-clip-text text-transparent">{big}</span>
      <span className="text-lg font-medium mt-2">{label}</span>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-md p-7 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition">
      <span className="text-4xl mb-2">{icon}</span>
      <span className="font-bold text-lg mb-2">{title}</span>
      <span className="text-gray-600 dark:text-gray-300 text-base">{desc}</span>
    </div>
  );
}

function Testimonial({ image, title, desc }) {
  return (
    <div className="flex flex-col items-center bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg p-8 max-w-sm">
      <Image src={image} alt={title} width={68} height={68} className="rounded-full mb-4" />
      <span className="font-bold text-lg mb-2">{title}</span>
      <p className="italic text-lg mb-4">{desc}</p>
    </div>
  );
}

// Simpler UI:-
// "use client";
// import { motion } from "framer-motion";
// import { Typewriter } from "react-simple-typewriter";

// export default function Home() {
//   return (
//     <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
//       <motion.h1
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="text-[#750000] text-4xl md:text-6xl font-extrabold mb-4 dark:text-[#4C4CA8]"
//       >
//         Welcome to Blog Showcase
//       </motion.h1>
//       <motion.p
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.2 }}
//         className="text-black text-lg md:text-2xl text-gray-700 dark:text-[#B3AC6D] mb-6"
//       >
//         <Typewriter
//           words={[
//             "Big ideas in small, digestible blogs",
//             "Web, AI, and databases — without the jargon",
//             "Level up your dev skills, post by post"
//           ]}
//           loop={0}
//           cursor
//           cursorStyle="_"
//           typeSpeed={60}
//           deleteSpeed={40}
//           delaySpeed={1200}
//         />
//       </motion.p>
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.5 }}
//         className="mt-8"
//       >
//         <img
//           src="/next.svg"
//           alt="Blog Showcase"
//           className="mx-auto w-40 md:w-60 rounded-2xl shadow-lg"
//         />
//       </motion.div>
//     </section>
//   );
// }