import { useState } from "react";
import Hero from "./components/Hero";
import AdminPanel from "./components/AdminPanel";
import TeacherPanel from "./components/TeacherPanel";
import StudentPanel from "./components/StudentPanel";

function App() {
  const [view, setView] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-lg" />
            <p className="text-white font-semibold">EE Department</p>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <button onClick={()=>setView("home")} className={`px-3 py-2 rounded-lg ${view==="home"?"bg-white/10":"hover:bg-white/10"}`}>الرئيسية</button>
            <button onClick={()=>setView("admin")} className={`px-3 py-2 rounded-lg ${view==="admin"?"bg-white/10":"hover:bg-white/10"}`}>الإدارة</button>
            <button onClick={()=>setView("teacher")} className={`px-3 py-2 rounded-lg ${view==="teacher"?"bg-white/10":"hover:bg-white/10"}`}>الأستاذ</button>
            <button onClick={()=>setView("student")} className={`px-3 py-2 rounded-lg ${view==="student"?"bg-white/10":"hover:bg-white/10"}`}>الطالب</button>
          </nav>
        </div>
      </header>

      {view === "home" && <Hero onNavigate={setView} />}

      {view !== "home" && (
        <main className="max-w-7xl mx-auto px-6 py-10">
          {view === "admin" && <AdminPanel />}
          {view === "teacher" && <TeacherPanel />}
          {view === "student" && <StudentPanel />}
        </main>
      )}

      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-blue-300/70">
          قسم الهندسة الكهربائية • منصة تجريبية
        </div>
      </footer>
    </div>
  );
}

export default App;
