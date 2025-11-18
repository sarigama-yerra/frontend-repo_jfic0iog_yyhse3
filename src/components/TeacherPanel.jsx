import { useEffect, useState } from "react";
const API = import.meta.env.VITE_BACKEND_URL || "";

function Section({ title, children }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-5 mb-6">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function TeacherPanel() {
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sections, setSections] = useState([]);

  const fetchSections = async () => {
    const r = await fetch(`${API}/sections`);
    setSections(await r.json());
  };
  const fetchMaterials = async () => {
    const r = await fetch(`${API}/materials`);
    setMaterials(await r.json());
  };

  useEffect(() => {
    fetchSections();
    fetchMaterials();
  }, []);

  const upload = async () => {
    if (!title || !url) return;
    await fetch(`${API}/materials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url, teacher_id: "demo-teacher", section_id: sectionId || null })
    });
    setTitle(""); setUrl(""); setSectionId("");
    fetchMaterials();
  };

  return (
    <div className="space-y-6">
      <Section title="رفع ملفات (صور / PDF) عبر رابط">
        <div className="grid sm:grid-cols-2 gap-3">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="عنوان الملف" className="bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder:text-blue-200/50"/>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="رابط الملف (Google Drive / PDF / Image)" className="bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder:text-blue-200/50"/>
          <select value={sectionId} onChange={(e)=>setSectionId(e.target.value)} className="bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-white">
            <option value="">قسم (اختياري)</option>
            {sections.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
          <button onClick={upload} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">رفع</button>
        </div>
      </Section>

      <Section title="كل المواد المرفوعة">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {materials.map(m => (
            <a key={m._id} href={m.url} target="_blank" className="block bg-slate-900/50 p-4 rounded-xl border border-white/10 hover:border-blue-400/50 transition">
              <p className="text-white font-medium">{m.title}</p>
              <p className="text-blue-200/70 text-sm mt-1">{m.section_id ? `قسم: ${m.section_id}` : "عام"}</p>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
