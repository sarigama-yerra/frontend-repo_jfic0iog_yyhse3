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

export default function StudentPanel() {
  const [levels, setLevels] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [ann, setAnn] = useState([]);
  const [materials, setMaterials] = useState([]);

  const load = async () => {
    const l = await (await fetch(`${API}/levels`)).json();
    const s = await (await fetch(`${API}/sections`)).json();
    setLevels(l); setSections(s);
  };
  useEffect(() => { load(); }, []);

  useEffect(() => {
    const run = async () => {
      if (!selectedSection) return;
      const tt = await (await fetch(`${API}/timetable?section_id=${selectedSection}`)).json();
      const an = await (await fetch(`${API}/announcements?section_id=${selectedSection}`)).json();
      const mm = await (await fetch(`${API}/materials?section_id=${selectedSection}`)).json();
      setTimetable(tt); setAnn(an); setMaterials(mm);
    };
    run();
  }, [selectedSection]);

  return (
    <div className="space-y-6">
      <Section title="اختيار القسم">
        <select value={selectedSection} onChange={(e)=>setSelectedSection(e.target.value)} className="bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-white">
          <option value="">اختر القسم</option>
          {sections.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
      </Section>

      <Section title="جدول الحصص">
        {timetable.length === 0 ? (
          <p className="text-blue-200/80">لا توجد حصص.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {timetable.map((t) => (
              <div key={t._id} className="bg-slate-900/50 p-4 rounded-xl border border-white/10">
                <p className="text-white font-medium">{t.day} {t.start_time} - {t.end_time}</p>
                <p className="text-blue-200/80 text-sm">{t.subject} • القاعة {t.room}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="التنبيهات والإشعارات">
        {ann.length === 0 ? (
          <p className="text-blue-200/80">لا توجد إشعارات.</p>
        ) : (
          <div className="space-y-3">
            {ann.map(a => (
              <div key={a._id} className="bg-slate-900/50 p-4 rounded-xl border border-white/10">
                <p className="text-white font-medium">{a.title}</p>
                <p className="text-blue-200/80 text-sm mt-1">{a.body}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="مواد الأستاذ (ملفات وصور)">
        {materials.length === 0 ? (
          <p className="text-blue-200/80">لا توجد مواد.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {materials.map(m => (
              <a key={m._id} href={m.url} target="_blank" className="block bg-slate-900/50 p-4 rounded-xl border border-white/10 hover:border-blue-400/50 transition">
                <p className="text-white font-medium">{m.title}</p>
              </a>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
