import { motion } from "framer-motion";

export default function Hero({ onNavigate }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(59,130,246,0.25),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]"
        >
          إدارة قسم الهندسة الكهربائية
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-blue-100/90"
        >
          منصة موحّدة للمديرين والأساتذة والطلبة لتنظيم الجداول، القاعات، المواد، التنبيهات والملفات.
        </motion.p>
        <div className="mt-10 flex items-center gap-4 justify-center">
          <button onClick={() => onNavigate("admin")} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30 transition">
            مساحة الإدارة
          </button>
          <button onClick={() => onNavigate("teacher")} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition">
            مساحة الأستاذ
          </button>
          <button onClick={() => onNavigate("student")} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition">
            مساحة الطالب
          </button>
        </div>
      </div>
    </div>
  );
}
