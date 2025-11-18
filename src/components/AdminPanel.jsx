import { useEffect, useMemo, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

function Section({ title, children }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-5 mb-6">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function AdminPanel() {
  const [levels, setLevels] = useState([]);
  const [sections, setSections] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchLevels = async () => {
    const res = await fetch(`${API}/levels`);
    setLevels(await res.json());
  };
  const fetchSections = async () => {
    const res = await fetch(`${API}/sections`);
    setSections(await res.json());
  };
  const fetchUsers = async () => {
    const res = await fetch(`${API}/users?approved=false`);
    setUsers(await res.json());
  };

  useEffect(() => {
    fetchLevels();
    fetchSections();
    fetchUsers();
  }, []);

  // Create Level
  const [levelName, setLevelName] = useState("");
  const addLevel = async () => {
    if (!levelName) return;
    await fetch(`${API}/levels`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: levelName })
    });
    setLevelName("");
    fetchLevels();
  };

  // Create Section
  const [sectionName, setSectionName] = useState("");
  const [sectionLevel, setSectionLevel] = useState("");
  const addSection = async () => {
    if (!sectionName || !sectionLevel) return;
    await fetch(`${API}/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: sectionName, level_id: sectionLevel })
    });
    setSectionName("");
    setSectionLevel("");
    fetchSections();
  };

  // Approvals
  const approveUser = async (id) => {
    await fetch(`${API}/users/${id}/approve`, { method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(true) });
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <Section title="قبول طلبات التسجيل">
        {users.length === 0 ? (
          <p className="text-blue-200/80">لا توجد طلبات معلّقة.</p>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u._id} className="flex items-center justify-between bg-slate-900/50 p-3 rounded-xl">
                <div>
                  <p className="text-white font-medium">{u.full_name}</p>
                  <p className="text-blue-300/70 text-sm">{u.email} • {u.role}</p>
                </div>
                <button onClick={() => approveUser(u._id)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg">قبول</button>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="المستويات الدراسية">
        <div className="flex gap-2">
          <input value={levelName} onChange={(e) => setLevelName(e.target.value)} placeholder="اسم المستوى (1ère L, 2ème L, 3ème L, Master...)" className="flex-1 bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder:text-blue-200/50"/>
          <button onClick={addLevel} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">إضافة</button>
        </div>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {levels.map(l => (
            <div key={l._id} className="bg-slate-900/50 p-3 rounded-xl border border-white/10">
              <p className="text-white">{l.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="الأقسام داخل كل مستوى">
        <div className="flex gap-2">
          <select value={sectionLevel} onChange={(e) => setSectionLevel(e.target.value)} className="bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-white">
            <option value="">اختر المستوى</option>
            {levels.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
          </select>
          <input value={sectionName} onChange={(e) => setSectionName(e.target.value)} placeholder="اسم القسم (A, B, C)" className="flex-1 bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder:text-blue-200/50"/>
          <button onClick={addSection} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">إضافة</button>
        </div>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sections.map(s => (
            <div key={s._id} className="bg-slate-900/50 p-3 rounded-xl border border-white/10">
              <p className="text-white">{s.name}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
